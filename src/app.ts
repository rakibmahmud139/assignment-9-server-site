import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/router";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";

const app: Application = express();

//parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Welcome to my world!",
  });
});

app.use("/api", router);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
