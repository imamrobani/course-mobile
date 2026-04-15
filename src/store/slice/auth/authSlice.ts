import { createSlice } from '@reduxjs/toolkit';
import { StorageKey } from '@constants';
import { User } from '@type/models/user';
import {
  getDataStorage,
  removeDataStorage,
  storeDataStorage,
} from '@utils/storage';
import { AppDispatch } from '../../store';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },

    resetAuth: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, setAuth, resetAuth } = authSlice.actions;

export const loadAuth = () => async (dispatch: AppDispatch) => {
  try {
    const token = await getDataStorage<string>(StorageKey.TOKEN);
    const user = await getDataStorage<User>(StorageKey.USER);

    if (token && user) {
      dispatch(setAuth({ token, user }));
    }
  } catch {
    // console.error('Error loading auth info', error);
  }
};

export const login = (username: string) => async (dispatch: AppDispatch) => {
  // Use a deterministic ID based on username so returning users maintain their identity
  // This ensures they can edit their own questions/comments after re-login
  const normalizedId = username.toLowerCase().replace(/\s+/g, '-');
  const mockUser: User = {
    id: `user-${normalizedId}`,
    name: username,
    email: `${normalizedId}@course-mobile.com`,
    avatar: `https://ui-avatars.com/api/?name=${username}&background=random`,
  };
  const mockToken = `mock-token-${Date.now()}`;

  await storeDataStorage(StorageKey.TOKEN, mockToken);
  await storeDataStorage(StorageKey.USER, mockUser);

  dispatch(setAuth({ token: mockToken, user: mockUser }));
};

export const clearAuth = () => async (dispatch: AppDispatch) => {
  await removeDataStorage(StorageKey.TOKEN);
  await removeDataStorage(StorageKey.USER);
  dispatch(resetAuth());
};

export default authSlice.reducer;
