import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { NextApiRequest } from 'next-auth/internals/next';
import { findUserById, verifyPassword } from 'lib/auth';
import { DBUser } from 'api-conn/user/type';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(
        credentials: Record<keyof DBUser, string>,
        req: NextApiRequest,
      ): Promise<{ id: string }> {
        const [user] = await findUserById(credentials.id);
        if (!user) {
          throw new Error('존재하지 않는 유저입니다.');
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password,
        );
        if (!isValid) throw new Error('유효하지 않은 사용자입니다.');
        return { id: user.id };
      },
    }),
  ],
});
