import { user } from '../pages/api/auth/signup';

export async function signUp(data: user) {
  const res = fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res;
}
