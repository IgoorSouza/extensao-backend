import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwt-service";

declare module "express-serve-static-core" {
  interface Request {
    userId: string;
  }
}

export default async function verifyAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    response.status(401).send("Autenticação necessária.");
    return;
  }

  try {
    const user = verifyToken(token);
    request.userId = user.id;
    next();
  } catch (error: any) {
    response.status(401).send("Invalid or expired token.");
  }
}
