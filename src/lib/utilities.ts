import * as bcrypt from 'bcrypt';

export async function hashString(str: string) {
  return bcrypt.hash(str, 10);
}
