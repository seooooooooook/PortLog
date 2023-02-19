import bcrypt, { compare } from 'bcrypt';
import { DBUser } from '../api-conn/user/type';
import promisePool from '../db-conn/db';

export async function findUserById(id: string): Promise<Array<DBUser>> {
  const [rows] = await promisePool.query(
    'select * from user where username= ?;',
    [id],
  );

  return rows;
}

export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 12);

  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
