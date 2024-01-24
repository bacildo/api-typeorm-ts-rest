import { NextFunction, Request, Response, Router } from "express";

import { StatusCodes } from "http-status-codes";

const status = Router();

status.get("/status", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(StatusCodes.OK).send({status:"Server Up!"})
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
});

export default status;