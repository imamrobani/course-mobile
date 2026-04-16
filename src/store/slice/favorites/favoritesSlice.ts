import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StorageKey } from '@constants';
import { logout } from '@store/slice/auth/authSlice';
import { getDataStorage, storeDataStorage } from '@utils/storage';
import type { PayloadAction } from '@reduxjs/toolkit';

type FavoritesStatus = 'idle' | 'hydrating' | 'ready';

type FavoritesState = {
  userId: string | null;
  ids: string[];
  status: FavoritesStatus;
};

const getFavoritesStorageKey = (userId: string) =>
  `${StorageKey.FAVORITES}:${userId}`;

export const hydrateFavorites = createAsyncThunk<
  { userId: string; ids: string[] },
  { userId: string }
>('favorites/hydrate', async ({ userId }) => {
  const key = getFavoritesStorageKey(userId);
  const ids = (await getDataStorage<string[]>(key)) ?? [];
  return { userId, ids };
});

export const persistFavorites = createAsyncThunk<
  void,
  { userId: string; ids: string[] }
>('favorites/persist', async ({ userId, ids }) => {
  const key = getFavoritesStorageKey(userId);
  await storeDataStorage(key, ids);
});

const initialState: FavoritesState = {
  userId: null,
  ids: [],
  status: 'idle',
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavoriteLocal: (
      state,
      action: PayloadAction<{ courseId: string }>,
    ) => {
      const id = action.payload.courseId;
      const exists = state.ids.includes(id);
      state.ids = exists
        ? state.ids.filter((favoriteId) => favoriteId !== id)
        : [...state.ids, id];
    },
    resetFavorites: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrateFavorites.pending, (state, action) => {
        state.status = 'hydrating';
        state.userId = action.meta.arg.userId;
      })
      .addCase(hydrateFavorites.fulfilled, (state, action) => {
        state.status = 'ready';
        state.userId = action.payload.userId;
        state.ids = action.payload.ids;
      })
      .addCase(hydrateFavorites.rejected, (state, action) => {
        state.status = 'ready';
        state.userId = action.meta.arg.userId;
        state.ids = [];
      })
      .addCase(logout.fulfilled, () => initialState);
  },
});

export const { toggleFavoriteLocal, resetFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
