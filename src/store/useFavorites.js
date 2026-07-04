import { create } from "zustand";

const STORAGE_KEY = "homi-favorites";

function loadFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveFavorites(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export const useFavorites = create((set) => ({
  favoriteIds: loadFavorites(),
  toggleFavorite: (id) =>
    set((state) => {
      const next = state.favoriteIds.includes(id)
        ? state.favoriteIds.filter((fid) => fid !== id)
        : [...state.favoriteIds, id];
      saveFavorites(next);
      return { favoriteIds: next };
    }),
  isFavorite: (id) => false,
}));
