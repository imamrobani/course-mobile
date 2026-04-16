import { createSlice } from '@reduxjs/toolkit';
import { mockComments } from '@mock/comments';
import { Comment } from '@type/models/course';
import type { PayloadAction } from '@reduxjs/toolkit';

type CommentsState = {
  byCourseId: Record<string, Comment[]>;
};

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

export const { toggleLike } = commentsSlice.actions;

export default commentsSlice.reducer;
