import { mockUsers } from '@mock/users';
import { User } from '@type/models/user';

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResult = {
  token: string;
  user: User;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchUsers = async (): Promise<User[]> => {
  await sleep(500);
  return mockUsers.map(({ password: _password, ...user }) => user);
};

const loginWithEmailPassword = async (
  input: LoginInput,
): Promise<LoginResult> => {
  await sleep(500);

  const rawUser = mockUsers.find(
    (u) => u.email.toLowerCase() === input.email.trim().toLowerCase(),
  );

  if (!rawUser) {
    throw new Error('Email atau password tidak valid');
  }

  if (rawUser.password !== input.password) {
    throw new Error('Email atau password tidak valid');
  }

  const { password: _password, ...user } = rawUser;
  const token = `mock-token-${rawUser.id}-${Date.now()}`;
  return { token, user };
};

export const AuthApi = {
  fetchUsers,
  loginWithEmailPassword,
};
