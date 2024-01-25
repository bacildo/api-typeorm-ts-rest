import "reflect-metadata";
import { Service } from "typedi";
import { DataSource } from "typeorm";
import { mysqlOptions, databaseEnabled } from "../config/development";

@Service()
export class Database {
  private static dataSourceMysql: DataSource;
  

  async connectMysql(): Promise<void> {
    if (databaseEnabled.mysqlOptions) {
      const { type, database } = mysqlOptions;
      Database.dataSourceMysql = new DataSource(mysqlOptions);
      Database.dataSourceMysql
        .initialize()
        .then(() => console.log("Successfully Connected!", type, database))
        .catch((error) => console.error("Connection Faield!", type, error));
    }
  }

  public static get mysql() :DataSource {
    return Database.dataSourceMysql;
  }

 
}
