import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthApi, LoginInput, LoginResult } from '@api/endpoints/auth';
import { StorageKey } from '@constants';
import { User } from '@type/models/user';
import {
  getDataStorage,
  removeDataStorage,
  storeDataStorage,
} from '@utils/storage';
import type { PayloadAction } from '@reduxjs/toolkit';

type AuthStatus = 'hydrating' | 'authenticated' | 'unauthenticated';

type HydrateResult = { token: string; user: User } | null;

export const hydrateAuth = createAsyncThunk<HydrateResult>(
  'auth/hydrate',
  async () => {
    try {
      const token = await getDataStorage<string>(StorageKey.TOKEN);
      const user = await getDataStorage<User>(StorageKey.USER);

      if (token && user) {
        return { token, user };
      }

      return null;
    } catch {
      return null;
    }
  },
);

export const loginWithEmailPassword = createAsyncThunk<
  LoginResult,
  LoginInput,
  { rejectValue: string }
>('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const result = await AuthApi.loginWithEmailPassword(payload);
    await storeDataStorage(StorageKey.TOKEN, result.token);
    await storeDataStorage(StorageKey.USER, result.user);
    return result;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Invalid email or password';
    return rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await removeDataStorage(StorageKey.TOKEN);
  await removeDataStorage(StorageKey.USER);
});

export const updateProfile = createAsyncThunk<
  User,
  { name: string; avatar: string; bio: string },
  { rejectValue: string }
>('auth/updateProfile', async (payload, { getState, rejectWithValue }) => {
  try {
    const state = getState() as { auth?: { user?: User | null } };
    const currentUser =
      state.auth?.user ?? (await getDataStorage<User>(StorageKey.USER));

    if (!currentUser) {
      return rejectWithValue('User session not found');
    }

    const name = payload.name.trim();
    if (!name) {
      return rejectWithValue('Name is required');
    }

    const avatar = payload.avatar.trim();
    const bio = payload.bio.trim();

    const updatedUser: User = {
      ...currentUser,
      name,
      avatar: avatar || currentUser.avatar,
      bio: bio ? bio : undefined,
    };

    await storeDataStorage(StorageKey.USER, updatedUser);
    return updatedUser;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to update profile';
    return rejectWithValue(message);
  }
});

interface AuthState {
  status: AuthStatus;
  token: string | null;
  user: User | null;
  isAuthenticating: boolean;
  isUpdatingProfile: boolean;
  error: string | null;
}

const initialState: AuthState = {
  status: 'hydrating',
  token: null,
  user: null,
  isAuthenticating: false,
  isUpdatingProfile: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrateAuth.pending, (state) => {
        state.status = 'hydrating';
        state.error = null;
      })
      .addCase(hydrateAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.status = 'authenticated';
          return;
        }

        state.token = null;
        state.user = null;
        state.status = 'unauthenticated';
      })
      .addCase(hydrateAuth.rejected, (state) => {
        state.token = null;
        state.user = null;
        state.status = 'unauthenticated';
      })
      .addCase(loginWithEmailPassword.pending, (state) => {
        state.isAuthenticating = true;
        state.error = null;
      })
      .addCase(loginWithEmailPassword.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.status = 'authenticated';
      })
      .addCase(loginWithEmailPassword.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.token = null;
        state.user = null;
        state.status = 'unauthenticated';
        state.error = action.payload ?? 'Invalid email or password';
      })
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdatingProfile = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isUpdatingProfile = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.status = 'unauthenticated';
        state.isAuthenticating = false;
        state.isUpdatingProfile = false;
        state.error = null;
      });
  },
});

export const { setAuthError } = authSlice.actions;

export default authSlice.reducer;
