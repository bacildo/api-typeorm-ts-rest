import { Router, Request, Response, NextFunction } from "express";
import {StatusCodes} from "http-status-codes"

const user = Router()

user.get("/users", (req: Request, res: Response, next: NextFunction) => {
  const users =[{name:'Diogo'}]
  res.status(StatusCodes.OK).send({users});
});

user.get("/users/:id", (req: Request, res: Response, next: NextFunction) => {
const id = req.params.id
  res.status(StatusCodes.OK).send({id});
});

export default user;