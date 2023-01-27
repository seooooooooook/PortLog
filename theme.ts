import { createTheme } from '@mui/material';
import React from 'react';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      // Purple and green play nicely together.
      main: '#5D84B4',
      light: '#A4BAD5',
      contrastText: '#FFFFFE',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#8A88BA',
      dark: '#53508A',
      contrastText: '#FFFFFE',
    },
    text: {
      primary: '#222743',
    },
  },
  typography: {
    logo: {
      color: 'primary',
      fontSize: '36px',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8A88BA',
      dark: '#53508A',
      contrastText: '#FFFFFE',
    },
    secondary: {
      main: '#5D84B4',
      light: '#A4BAD5',
      contrastText: '#FFFFFE',
    },
    text: {
      primary: '#FFFFFE',
    },
    background: {
      default: '#222743',
      paper: '#D9D9D9',
    },
  },
});

declare module '@mui/material/styles' {
  interface TypographyVariants {
    logo: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    logo?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    logo: true;
  }
}
