import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const user = Router();

user.get("/users", (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = [{ name: "Diogo" }];
    return res.status(StatusCodes.OK).send({ users });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
  }
});

user.get("/users/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    res.status(StatusCodes.OK).send({ id });
    return;
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
});

user.post("/users", (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = req.body;
    // console.log(newUser)
    return res.status(StatusCodes.CREATED).send(newUser);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
});

user.put("/users/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const userChanged = req.body;
    userChanged.id = id;
    res.status(StatusCodes.OK).send(userChanged);
    return;
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
});

user.delete("/users/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(StatusCodes.OK);
    return;
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
});

export default user;
