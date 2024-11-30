import { ThemeStoreProvider, useThemeStore } from '../store/provider';
import { SessionProvider } from 'next-auth/react';
import { ThemeWrapper } from '../components/Atom';
import { auth } from 'auth';
import { CssBaseline } from '@mui/material';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="ko">
      <body>
        <SessionProvider session={session}>
          <ThemeStoreProvider>
            <ThemeWrapper>
              <CssBaseline />
              {children}
            </ThemeWrapper>
          </ThemeStoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
