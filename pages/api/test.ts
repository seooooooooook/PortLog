import type { NextApiRequest, NextApiResponse } from 'next';
import promisePool from '../../config/db/db';

export default async function test(req: NextApiRequest, res: NextApiResponse) {
  const result = await promisePool.query('select * from user');
  console.log(result);
}
