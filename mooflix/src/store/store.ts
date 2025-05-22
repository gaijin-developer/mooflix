import { create } from "zustand";
import type { Movie } from "../types/Movie";

type State = {
  searchedMovies: Movie[];
};

type Actions = {
  setSearchedMovies: (movies: Movie[]) => void;
};

export const useStore = create<State & Actions>((set) => ({
  searchedMovies: [],
  setSearchedMovies: (movies) => set(() => ({ searchedMovies: movies })),
}));
