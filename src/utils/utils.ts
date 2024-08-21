import { hash, compare } from 'bcrypt';

export const hashPassword = async (password: string) => {
  return hash(password, 10);
};

export const comparePassword = (paswd, hash) => {
  return compare(paswd, hash);
};
