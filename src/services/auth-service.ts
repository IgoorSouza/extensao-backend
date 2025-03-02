import { generateToken } from "./jwt-service";
import { createUser, getUserByEmail } from "./user-service";
import bcrypt from "bcrypt";

export async function createNewUser(user: any) {
  await createUser(user);
}

export async function login({ email, password }: any) {
  const user = await getUserByEmail(email);
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Wrong password.");
  }

  return generateToken(user);
}
