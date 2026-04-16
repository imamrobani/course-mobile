import { Comment } from '@type/models/course';

export const mockComments: Comment[] = [
  {
    id: 'c-1',
    courseId: '1',
    user: { id: '2', name: 'Jane Smith' },
    message: 'Materinya jelas dan enak diikuti. Cocok buat pemula.',
    createdAt: '2025-05-03T10:00:00.000Z',
    likesCount: 2,
    likedByUser: false,
  },
  {
    id: 'c-2',
    courseId: '1',
    user: { id: '1', name: 'John Doe' },
    message:
      'Bagian navigation-nya helpful. Bisa ditambah contoh state management.',
    createdAt: '2025-05-05T10:00:00.000Z',
    likesCount: 1,
    likedByUser: true,
  },
  {
    id: 'c-3',
    courseId: '2',
    user: { id: '1', name: 'John Doe' },
    message:
      'TypeScript tips-nya ngebantu banget buat rapihin types di project.',
    createdAt: '2025-06-01T10:00:00.000Z',
    likesCount: 0,
    likedByUser: false,
  },
  {
    id: 'c-4',
    courseId: '3',
    user: { id: '2', name: 'Jane Smith' },
    message:
      'RTK + thunk pattern-nya bagus. Pengin lihat contoh optimistic update.',
    createdAt: '2025-06-10T10:00:00.000Z',
    likesCount: 3,
    likedByUser: false,
  },
];
