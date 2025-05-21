import { create } from "zustand";

const useStore = create((set) => ({
  isLoggedIn: false,
  movies: [],
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
}));
