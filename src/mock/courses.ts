import { Course } from '@type/models/course';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React Native Fundamentals',
    description: 'Build your first mobile app with React Native and Expo.',
    content:
      'In this course you will learn core concepts such as components, props, state, styling, navigation, and data fetching. ' +
      'By the end, you will ship a small but complete app and understand how to scale your codebase.',
    category: 'Mobile',
    duration: '2h 10m',
    level: 'Beginner',
    author: 'Habmann Academy',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    createdAt: '2025-01-12T10:00:00.000Z',
  },
  {
    id: '2',
    title: 'TypeScript for React Native',
    description: 'Write safer code with practical TypeScript patterns.',
    content:
      'We cover typing components, navigation params, API responses, and state management. ' +
      'You will also learn how to model domain types and keep your app maintainable as it grows.',
    category: 'Mobile',
    duration: '1h 45m',
    level: 'Intermediate',
    author: 'Habmann Academy',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    createdAt: '2025-02-03T10:00:00.000Z',
  },
  {
    id: '3',
    title: 'State Management with Redux Toolkit',
    description: 'Centralize your state with RTK, async thunks, and selectors.',
    content:
      'Learn how to structure slices, normalize data, and manage server/cache state. ' +
      'Includes patterns for optimistic updates and predictable data flow across multiple screens.',
    category: 'Architecture',
    duration: '2h 30m',
    level: 'Intermediate',
    author: 'Habmann Academy',
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    createdAt: '2025-03-15T10:00:00.000Z',
  },
  {
    id: '4',
    title: 'UI Polish for Mobile',
    description:
      'Make your app feel modern with spacing, typography, and motion.',
    content:
      'We focus on practical UI improvements: consistent spacing system, typography scale, accessible touch targets, empty/loading states, ' +
      'and subtle animation that improves UX.',
    category: 'Design',
    duration: '1h 20m',
    level: 'Beginner',
    author: 'Habmann Academy',
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    rating: 4.4,
    createdAt: '2025-04-20T10:00:00.000Z',
  },
  {
    id: '5',
    title: 'Networking in React Native',
    description: 'Build a clean API layer with Axios and error handling.',
    content:
      'You will implement a reusable HTTP client, handle auth headers, parse errors consistently, ' +
      'and design a small repository layer so screens stay clean.',
    category: 'Backend',
    duration: '1h 35m',
    level: 'Intermediate',
    author: 'Habmann Academy',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    createdAt: '2025-05-02T10:00:00.000Z',
  },
];
