import { createSlice } from '@reduxjs/toolkit';
import { mockComments } from '@mock/comments';
import { Comment } from '@type/models/course';
import type { PayloadAction } from '@reduxjs/toolkit';

type CommentsState = {
  byCourseId: Record<string, Comment[]>;
};

const createCommentId = () =>
  `c-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const initialState: CommentsState = {
  byCourseId: mockComments.reduce<Record<string, Comment[]>>((acc, comment) => {
    acc[comment.courseId] = acc[comment.courseId] ?? [];
    acc[comment.courseId].push(comment);
    return acc;
  }, {}),
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (
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
    toggleLike: (
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
});

export const { addComment, toggleLike } = commentsSlice.actions;

export default commentsSlice.reducer;
