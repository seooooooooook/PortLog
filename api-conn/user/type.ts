import { User } from 'next-auth';

export interface DBUser extends User {
  id: string;
  password: string;
  name: string;
  phone: string;
}
