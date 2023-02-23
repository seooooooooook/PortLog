import NextAuth, { NextAuthOptions, RequestInternal, User } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from 'lib/auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'lib/prismadb';

interface login {
  id: string;
  password: string;
}

export const authOption: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.sub;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      type: 'credentials',
      name: '',
      credentials: {
        id: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(
        credentials: Record<keyof login, string>,
        req: RequestInternal,
      ): Promise<User> {
        const user = await prisma.user.findUnique({
          where: { id: credentials.id },
        });
        if (!user) throw new Error('존재하지 않는 유저입니다.');
        const isValid = await verifyPassword(
          credentials.password,
          user.password,
        );
        if (!isValid) throw new Error('유효하지 않은 사용자입니다.');

        return user;
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOption);
