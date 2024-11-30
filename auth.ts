import NextAuth, { User } from 'next-auth';
import Kakao from 'next-auth/providers/kakao';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from 'lib/prismadb';
import { verifyPassword } from './lib/auth';

interface login {
  id: string;
  password: string;
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token, user }) {
      if (token.sub != null) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  providers: [
    Kakao,
    Credentials({
      id: 'credentials',
      type: 'credentials',
      name: '',
      credentials: {
        id: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials: Record<keyof login, string>): Promise<User> {
        const user = await prisma.user.findUnique({
          where: { id: credentials.id },
        });
        if (!user) throw new Error('존재하지 않는 유저입니다.');
        if (!user.password) throw new Error('비밀번호가 존재하지 않습니다.');
        const isValid = await verifyPassword(
          credentials.password,
          user.password,
        );
        if (!isValid) throw new Error('유효하지 않은 사용자입니다.');

        return user;
      },
    }),
  ],
});
