import { create, findByEmail } from "../repositories/user-repository";
import bcrypt from "bcrypt";

export async function createUser(user: any) {
  const encryptedPassword = await bcrypt.hash(user.password, 10);
  await create({ ...user, password: encryptedPassword });
}

export async function getUserByEmail(email: string) {
  const user = await findByEmail(email);
  if (!user) throw new Error("User not found.");

  return user;
}
