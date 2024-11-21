import { ThemeStoreProvider, useThemeStore } from '../store/provider';
import { SessionProvider } from 'next-auth/react';
import { ThemeWrapper } from '../components/Atom';
import { getServerSession } from 'next-auth';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="ko">
      <body>
        <SessionProvider session={session}>
          <ThemeStoreProvider>
            <ThemeWrapper>{children}</ThemeWrapper>
          </ThemeStoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
