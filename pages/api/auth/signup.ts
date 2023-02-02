import type { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword, isExists } from '../../../lib/auth';
import promisePool from '../../../config/db/db';

export interface user {
  id: string;
  password: string;
  name: string;
  phone: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }
  const data = req.body;
  const { id, password, name, phone } = data;

  if (!id) {
    res.status(422).json({ message: '유효하지 않은 아이디입니다.' });
    return;
  }
  if (!password) {
    res.status(422).json({ message: '유효하지 않은 패스워드입니다.' });
    return;
  }
  const isExist = await isExists(id);
  if (isExist) {
    res.status(422).json({ message: '이미 존재하는 아이디입니다.' });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await promisePool.query(
    'insert into user(username, password, name, phone) values(?, ?, ?, ?)',
    [id, hashedPassword, name, phone],
  );
  res.status(201).json({ message: 'created user' });
}

export default handler;
