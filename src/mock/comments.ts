import { Comment } from '@type/models/course';

export const mockComments: Comment[] = [
  {
    id: 'c-1',
    courseId: '1',
    user: { id: '2', name: 'Jane Smith' },
    message: 'Clear explanation and easy to follow. Great for beginners.',
    createdAt: '2025-05-03T10:00:00.000Z',
    likesCount: 2,
    likedByUser: false,
  },
  {
    id: 'c-2',
    courseId: '1',
    user: { id: '1', name: 'John Doe' },
    message:
      'The navigation section is very helpful. Would love to see a state management example too.',
    createdAt: '2025-05-05T10:00:00.000Z',
    likesCount: 1,
    likedByUser: true,
  },
  {
    id: 'c-3',
    courseId: '2',
    user: { id: '1', name: 'John Doe' },
    message:
      'The TypeScript tips really helped me clean up types in my project.',
    createdAt: '2025-06-01T10:00:00.000Z',
    likesCount: 0,
    likedByUser: false,
  },
  {
    id: 'c-4',
    courseId: '3',
    user: { id: '2', name: 'Jane Smith' },
    message:
      'Great RTK + thunk patterns. Would love to see an optimistic update example.',
    createdAt: '2025-06-10T10:00:00.000Z',
    likesCount: 3,
    likedByUser: false,
  },
];
