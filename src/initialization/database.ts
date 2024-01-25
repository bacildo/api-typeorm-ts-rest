import "reflect-metadata";
import { Service } from "typedi";
import { DataSource } from "typeorm";
import { mysqlOptions, databaseEnabled } from "../config/development";

@Service()
export class ConnectDatabase {
  private static dataSourceMysql: DataSource
  async connectMysql(): Promise<void> {
    if (databaseEnabled) {
      const { type, database } = mysqlOptions;
      ConnectDatabase.dataSourceMysql = new DataSource(mysqlOptions);
      ConnectDatabase.dataSourceMysql
        .initialize()
        .then(() => console.log("Successfully Connected!", type, database))
        .catch((error) => console.error("Connection Faield!", type, error));
    }
  }
}
