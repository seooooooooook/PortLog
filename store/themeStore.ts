import { create, createStore } from 'zustand';

export type ThemeState = {
  isDarkMode: boolean;
};

export type ThemeActions = {
  setTheme: (theme: boolean) => void;
};

export type ThemeStore = ThemeActions & ThemeState;

export const defaultInitState: ThemeState = {
  isDarkMode: false,
};

export const createThemeStore = (initState: ThemeState = defaultInitState) => {
  return createStore<ThemeStore>()((set) => ({
    ...initState,
    setTheme: () =>
      set((state: ThemeStore) => ({ isDarkMode: !state.isDarkMode })),
  }));
};
