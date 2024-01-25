import "reflect-metadata";
import * as express from "express";
import { createExpressServer } from "routing-controllers";
import { serverPort } from "../config/development";
import { CustomerController } from "../controllers/customer";

export class Server {
  private app!: express.Application;

  init(): void {
    this.app = createExpressServer({
      routePrefix: "api",
      controllers: [CustomerController],
    });
    console.log("Server Initialized");
  }
  start(): void {
    this.app.listen(serverPort.port, () => {
      console.log("Server running on port " + serverPort.port);
    });
  }
}
