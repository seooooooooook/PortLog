import NextAuth, { RequestInternal, User } from 'next-auth';
import Kakao from 'next-auth/providers/kakao';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'lib/prismadb';
import { verifyPassword } from './lib/auth';

export const { auth, handlers, signIn, signOut } = NextAuth({
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
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
      async authorize(credentials): Promise<User> {
        const user = await prisma.user.findUnique({
          where: { id: credentials?.id },
        });
        if (!user) throw new Error('존재하지 않는 유저입니다.');
        if (!user.password) throw new Error('비밀번호가 존재하지 않습니다.');
        if (!credentials) throw new Error('비밀번호를 입력해주세요.');
        const isValid = await verifyPassword(
          credentials.password,
          user?.password,
        );
        if (!isValid) throw new Error('유효하지 않은 사용자입니다.');

        return user;
      },
    }),
  ],
});
