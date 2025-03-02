import { Express, Router, Request, Response } from "express";
import { createNewUser, login } from "../services/auth-service";

export default function authController(app: Express) {
  const router = Router();

  router.post("/register", async (request: Request, response: Response) => {
    try {
      const user = request.body;

      await createNewUser(user);
      response.status(201).send("User successfully created.");
    } catch (error: any) {
      if (error.code === "P2002") {
        response.status(409).send("Email already in use.");
        return;
      }

      console.error(error);
      response.status(500).send("Internal Server Error.");
    }
  });

  router.post("/login", async (request: Request, response: Response) => {
    try {
      const credentials = request.body;
      const accessToken = await login(credentials);

      response.status(200).send(accessToken);
    } catch (error: any) {
      if (error.message === "User not found.") {
        response.status(404).send(error.message);
        return;
      }

      if (error.message === "Wrong password.") {
        response.status(401).send(error.message);
        return;
      }

      console.error(error);
      response.status(500).send("Internal Server Error.");
    }
  });

  app.use("/auth", router);
}
