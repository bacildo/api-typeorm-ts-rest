import express, { Request, Response, NextFunction } from "express";
import user from "./routes/user";

const app = express();

app.use(user)

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({hello:"Hello World!"});
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
