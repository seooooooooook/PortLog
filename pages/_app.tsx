import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import React, { useMemo } from 'react';
import { darkTheme, lightTheme } from 'theme';
import { useThemeStore, ThemeStoreProvider } from '../store/provider';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  // @ts-ignore
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeStoreProvider>
        <ThemeWrapper>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeWrapper>
      </ThemeStoreProvider>
    </SessionProvider>
  );
}

function ThemeWrapper({ children }) {
  const { isDarkMode } = useThemeStore((state) => state); // ThemeStoreProvider 내부에서 호출
  const theme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode],
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
