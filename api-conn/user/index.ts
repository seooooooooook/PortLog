'use client';
import { DBUser } from './type';

/**
 * 회원가입
 * @param data POST body
 * @param {string} DBUser.id 유저아이디
 * @param {string} DBUser.password 유저비밀번호
 * @param {string} DBUser.name 이름
 * @param {string} DBUser.phone 전화번호
 */
export async function signUp(data: DBUser) {
  const res = fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res;
}
