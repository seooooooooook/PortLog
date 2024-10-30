import { createThemeStore, ThemeStore } from './themeStore';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand/react';

export type ThemeStoreApi = ReturnType<typeof createThemeStore>;

export const ThemeStoreContext = createContext<ThemeStoreApi | undefined>(
  undefined,
);

export interface ThemeStoreProviderProps {
  children: ReactNode;
}

export const ThemeStoreProvider = ({ children }: ThemeStoreProviderProps) => {
  const storeRef = useRef<ThemeStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createThemeStore();
  }

  return (
    <ThemeStoreContext.Provider value={storeRef.current}>
      {children}
    </ThemeStoreContext.Provider>
  );
};

export const useThemeStore = <T,>(selector: (store: ThemeStore) => T): T => {
  const themeStoreContext = useContext(ThemeStoreContext);

  if (!themeStoreContext) {
    throw new Error(`useThemeStore must be used within ThemeStoreProvider`);
  }

  return useStore(themeStoreContext, selector);
};
