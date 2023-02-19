import type { NextApiRequest, NextApiResponse } from 'next';
import { findUserById, hashPassword } from '../../../lib/auth';
import promisePool from '../../../db-conn/db';
import { User } from 'next-auth';

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
  // const findUser = await findUserById(id);
  const findUser: User = await prisma.user.findUnique({ where: { id: id } });

  if (findUser) {
    res.status(422).json({ message: '이미 존재하는 아이디입니다.' });
    return;
  }

  const hashedPassword = await hashPassword(password);

  // await promisePool.query(
  //   'insert into user(username, password, name, phone) values(?, ?, ?, ?)',
  //   [id, hashedPassword, name, phone],
  // );
  const result = await prisma.user.create({
    data: {
      id: id,
      name: name,
      password: hashedPassword,
    },
  });

  if (result) {
    res.status(201).json({ message: 'created user' });
  } else {
    res.status(500).json({ message: 'error' });
  }
}

export default handler;
