import bcrypt from 'bcrypt';
import promisePool from '../config/db/db';

export async function isExists(id: string) {
  const [rows, field] = await promisePool.query(
    'select * from user where username= ?;',
    [id],
  );

  return rows.length !== 0;
}

export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}
