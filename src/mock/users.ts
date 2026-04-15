import { User } from '@type/models/user';

export const mockUsers: Array<
  Required<Pick<User, 'id' | 'name' | 'email' | 'password' | 'avatar'>> &
    Pick<User, 'bio'>
> = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456',
    avatar: 'https://i.pravatar.cc/300?img=12',
    bio: 'Mobile learner',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: '123456',
    avatar: 'https://i.pravatar.cc/300?img=32',
    bio: 'React Native enthusiast',
  },
];
