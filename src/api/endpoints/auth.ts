import api from '@api/client';
import { API_URL } from '@constants/Endpoints';
import { User } from '@type/models/user';

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResult = {
  token: string;
  user: User;
};

const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>(API_URL.USERS);
  return response.data;
};

const loginWithEmailPassword = async (
  input: LoginInput,
): Promise<LoginResult> => {
  const users = await fetchUsers();
  const rawUser = users.find(
    (u) => u.email.toLowerCase() === input.email.trim().toLowerCase(),
  );

  if (!rawUser || rawUser.password !== input.password) {
    throw new Error('Invalid email or password');
  }

  const { password: _password, ...user } = rawUser;
  const token = `mock-token-${rawUser.id}-${Date.now()}`;
  return { token, user };
};

export const AuthApi = {
  fetchUsers,
  loginWithEmailPassword,
};
