import "reflect-metadata";
import {Database , Server} from "./index";

export class App {
  private server = new Server();
  private databaseMysql = new Database()
  private databaseMongo = new Database()
  async appInitialize():Promise<Server>{

    await this.databaseMysql.connectMysql()
    await this.databaseMongo.connectMongo()
    this.server.init()
    return this.server
  }
}



