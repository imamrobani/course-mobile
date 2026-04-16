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
  status: CommentsStatus;
  userId: string | null;
};

const createCommentId = () =>
  `c-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const getCommentsStorageKey = (userId: string) =>
  `${StorageKey.COMMENTS}:${userId}`;

export const hydrateComments = createAsyncThunk<
  { userId: string; byCourseId: Record<string, Comment[]> },
  { userId: string }
>('comments/hydrate', async ({ userId }) => {
  const key = getCommentsStorageKey(userId);
  const byCourseId =
    (await getDataStorage<Record<string, Comment[]>>(key)) ?? {};
  return { userId, byCourseId };
});

export const persistComments = createAsyncThunk<
  void,
  { userId: string; byCourseId: Record<string, Comment[]> }
>('comments/persist', async ({ userId, byCourseId }) => {
  const key = getCommentsStorageKey(userId);
  await storeDataStorage(key, byCourseId);
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

      const nextLiked = !comment.likedByUser;
      comment.likedByUser = nextLiked;
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
        state.byCourseId = {
          ...initialByCourseId,
          ...action.payload.byCourseId,
        };
      })
      .addCase(hydrateComments.rejected, (state, action) => {
        state.status = 'ready';
        state.userId = action.meta.arg.userId;
        state.byCourseId = initialByCourseId;
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
    persistComments({ userId, byCourseId: state.comments.byCourseId }),
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
      persistComments({ userId, byCourseId: state.comments.byCourseId }),
    );
  },
);

export const { addCommentLocal, toggleLikeLocal } = commentsSlice.actions;

export default commentsSlice.reducer;
