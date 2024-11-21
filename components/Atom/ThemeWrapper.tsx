'use client';
import { useThemeStore } from '../../store/provider';
import React, { useMemo } from 'react';
import { darkTheme, lightTheme } from '../../theme';
import { ThemeProvider } from '@mui/material';

export default function ThemeWrapper({ children }) {
  const { isDarkMode } = useThemeStore((state) => state); // ThemeStoreProvider 내부에서 호출
  const theme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode],
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
