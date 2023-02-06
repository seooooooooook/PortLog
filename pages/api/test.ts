import type { NextApiRequest, NextApiResponse } from 'next';
import promisePool from '../../db-conn/db';

export default async function test(req: NextApiRequest, res: NextApiResponse) {
  const [row] = await promisePool.query('select * from user');
  console.log(row);
}
