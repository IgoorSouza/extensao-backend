import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import authController from "./controllers/auth-controller";
import verifyAuthentication from "./middlewares/auth-guard";

const app = express();
app.use(json());
app.use(cors());

authController(app);

app.get("/test", verifyAuthentication, (request, response) => {
  response.status(200).send("Você está autenticado.");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
