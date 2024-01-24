import "reflect-metadata"
import {Service} from "typedi"
import {ConnectDatabase} from "./index"

@Service()
export class Connections {
  constructor(
    private readonly database: ConnectDatabase,
  ) {
  }
  async connection(): Promise<void> {

    await this.database.connectMysql()
  }
}
