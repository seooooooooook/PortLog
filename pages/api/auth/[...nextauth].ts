import NextAuth, { User } from 'next-auth';
import Providers from 'next-auth/providers';
import { PoolConnection } from 'mysql2/promise';
import promisePool from 'db-conn/db';
import { NextApiRequest } from 'next-auth/internals/next';
import { Awaitable } from 'next-auth/internals/utils';
import { findUserById, verifyPassword } from 'lib/auth';
import { DBUser } from 'api-conn/user/type';

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(
        credentials: Record<keyof DBUser, string>,
        req: NextApiRequest,
      ): Awaitable<User | null> {
        const conn = promisePool.getConnection(
          async (conn: PoolConnection) => conn,
        );
        const user = await findUserById(credentials.id, conn);
        if (!user) {
          throw new Error('존재하지 않는 유저입니다.');
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password,
        );
      },
    }),
  ],
});
