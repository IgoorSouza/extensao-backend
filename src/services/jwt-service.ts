import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

export function generateToken(user: any) {
  return jwt.sign(user, secret, { expiresIn: "1s" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret) as any;
}