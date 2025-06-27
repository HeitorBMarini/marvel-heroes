import { create } from "zustand";

interface Character {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

interface FavoritesStore {
  favorites: Character[];
  toggleFavorite: (char: Character) => void;
}

export const useFavorites = create<FavoritesStore>((set) => ({
  favorites: [],
  toggleFavorite: (char) =>
    set((state) => {
      const isAlreadyFav = state.favorites.some((c) => c.id === char.id);
      if (isAlreadyFav) {
        return {
          favorites: state.favorites.filter((c) => c.id !== char.id),
        };
      }

      if (state.favorites.length >= 5) {
        alert("Você só pode favoritar até 5 personagens.");
        return state;
      }

      return {
        favorites: [...state.favorites, char],
      };
    }),
}));
