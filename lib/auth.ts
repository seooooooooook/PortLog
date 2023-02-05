import bcrypt, { compare } from 'bcrypt';
import { PoolConnection } from 'mysql2/promise';
import { DBUser } from '../api-conn/user/type';

export async function findUserById(id: string, conn: PoolConnection): DBUser {
  const [rows] = await conn.query('select * from user where username= ?;', [
    id,
  ]);

  console.log(rows);
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
