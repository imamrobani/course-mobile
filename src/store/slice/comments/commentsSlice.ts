import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StorageKey } from '@constants';
import { mockComments } from '@mock/comments';
import { logout } from '@store/slice/auth/authSlice';
import { Comment } from '@type/models/course';
import { getDataStorage, storeDataStorage } from '@utils/storage';
import type { PayloadAction } from '@reduxjs/toolkit';

type CommentsStatus = 'idle' | 'hydrating' | 'ready';

type CommentsState = {
  byCourseId: Record<string, Comment[]>;
  likedIds: string[];
  status: CommentsStatus;
  userId: string | null;
};

const createCommentId = () =>
  `c-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const getCommentsStorageKey = () => StorageKey.COMMENTS_GLOBAL;

const getLegacyCommentsStorageKey = (userId: string) =>
  `${StorageKey.COMMENTS_GLOBAL}:${userId}`;

const getCommentLikesStorageKey = (userId: string) =>
  `${StorageKey.COMMENT_LIKES}:${userId}`;

const mergeById = (
  base: Record<string, Comment[]>,
  incoming: Record<string, Comment[]>,
) => {
  const result: Record<string, Comment[]> = { ...base };

  Object.entries(incoming).forEach(([courseId, list]) => {
    const map = new Map((result[courseId] ?? []).map((c) => [c.id, c]));
    list.forEach((c) => {
      if (!map.has(c.id)) {
        map.set(c.id, c);
      }
    });
    result[courseId] = Array.from(map.values());
  });

  Object.entries(result).forEach(([courseId, list]) => {
    result[courseId] = [...list].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  });

  return result;
};

export const hydrateComments = createAsyncThunk<
  { userId: string; byCourseId: Record<string, Comment[]>; likedIds: string[] },
  { userId: string }
>('comments/hydrate', async ({ userId }) => {
  const globalKey = getCommentsStorageKey();
  const legacyKey = getLegacyCommentsStorageKey(userId);

  const globalByCourseId =
    (await getDataStorage<Record<string, Comment[]>>(globalKey)) ?? {};
  const legacyByCourseId =
    (await getDataStorage<Record<string, Comment[]>>(legacyKey)) ?? {};

  const merged = mergeById(
    mergeById(initialByCourseId, globalByCourseId),
    legacyByCourseId,
  );

  if (Object.keys(legacyByCourseId).length > 0) {
    await storeDataStorage(globalKey, merged);
  }

  const likedIds =
    (await getDataStorage<string[]>(getCommentLikesStorageKey(userId))) ?? [];

  return { userId, byCourseId: merged, likedIds };
});

export const persistComments = createAsyncThunk<
  void,
  { byCourseId: Record<string, Comment[]> }
>('comments/persist', async ({ byCourseId }) => {
  const key = getCommentsStorageKey();
  await storeDataStorage(key, byCourseId);
});

export const persistCommentLikes = createAsyncThunk<
  void,
  { userId: string; likedIds: string[] }
>('comments/persistLikes', async ({ userId, likedIds }) => {
  await storeDataStorage(getCommentLikesStorageKey(userId), likedIds);
});

const initialByCourseId = mockComments.reduce<Record<string, Comment[]>>(
  (acc, comment) => {
    acc[comment.courseId] = acc[comment.courseId] ?? [];
    acc[comment.courseId].push(comment);
    return acc;
  },
  {},
);

const initialState: CommentsState = {
  byCourseId: initialByCourseId,
  likedIds: [],
  status: 'idle',
  userId: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addCommentLocal: (
      state,
      action: PayloadAction<{
        courseId: string;
        message: string;
        user: { id: string; name: string; avatar?: string };
      }>,
    ) => {
      const message = action.payload.message.trim();
      if (!message) {
        return;
      }

      const comment: Comment = {
        id: createCommentId(),
        courseId: action.payload.courseId,
        user: action.payload.user,
        message,
        createdAt: new Date().toISOString(),
        likesCount: 0,
        likedByUser: false,
      };

      state.byCourseId[action.payload.courseId] = [
        comment,
        ...(state.byCourseId[action.payload.courseId] ?? []),
      ];
    },
    toggleLikeLocal: (
      state,
      action: PayloadAction<{ courseId: string; commentId: string }>,
    ) => {
      const { courseId, commentId } = action.payload;
      const list = state.byCourseId[courseId];
      if (!list) {
        return;
      }

      const comment = list.find((c) => c.id === commentId);
      if (!comment) {
        return;
      }

      const liked = state.likedIds.includes(commentId);
      const nextLiked = !liked;

      state.likedIds = nextLiked
        ? [...state.likedIds, commentId]
        : state.likedIds.filter((id) => id !== commentId);

      comment.likesCount = Math.max(
        0,
        comment.likesCount + (nextLiked ? 1 : -1),
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrateComments.pending, (state, action) => {
        state.status = 'hydrating';
        state.userId = action.meta.arg.userId;
      })
      .addCase(hydrateComments.fulfilled, (state, action) => {
        state.status = 'ready';
        state.userId = action.payload.userId;
        state.byCourseId = action.payload.byCourseId;
        state.likedIds = action.payload.likedIds;
      })
      .addCase(hydrateComments.rejected, (state, action) => {
        state.status = 'ready';
        state.userId = action.meta.arg.userId;
        state.byCourseId = initialByCourseId;
        state.likedIds = [];
      })
      .addCase(logout.fulfilled, () => initialState);
  },
});

export const toggleLike = createAsyncThunk<
  void,
  { userId: string; courseId: string; commentId: string }
>('comments/toggleLike', async ({ userId, courseId, commentId }, thunkApi) => {
  thunkApi.dispatch(toggleLikeLocal({ courseId, commentId }));
  const state = thunkApi.getState() as { comments: CommentsState };
  await thunkApi.dispatch(
    persistComments({ byCourseId: state.comments.byCourseId }),
  );
  await thunkApi.dispatch(
    persistCommentLikes({ userId, likedIds: state.comments.likedIds }),
  );
});

export const addComment = createAsyncThunk<
  void,
  {
    userId: string;
    courseId: string;
    message: string;
    user: { id: string; name: string; avatar?: string };
  }
>(
  'comments/addComment',
  async ({ userId, courseId, message, user }, thunkApi) => {
    thunkApi.dispatch(addCommentLocal({ courseId, message, user }));
    const state = thunkApi.getState() as { comments: CommentsState };
    await thunkApi.dispatch(
      persistComments({ byCourseId: state.comments.byCourseId }),
    );
    await thunkApi.dispatch(
      persistCommentLikes({ userId, likedIds: state.comments.likedIds }),
    );
  },
);

export const { addCommentLocal, toggleLikeLocal } = commentsSlice.actions;

export default commentsSlice.reducer;
