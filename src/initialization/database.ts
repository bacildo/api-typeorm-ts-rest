import "reflect-metadata";
import { Service } from "typedi";
import { DataSource } from "typeorm";
import {
  databaseEnabled,
  mysqlOptions,
  mongoOptions,
} from "../config";

@Service()
export class Database {
  private static dataSourceMysql: DataSource;
  private static dataSourceMongo: DataSource;

  async connectMysql(): Promise<void> {
    if (databaseEnabled.mysqlOptions) {
      const { type, database } = mysqlOptions;
      Database.dataSourceMysql = new DataSource(mysqlOptions);
      Database.dataSourceMysql.initialize()
        .then(() => console.log("Successfully Connected!", type, database))
        .catch((error) => console.error("Connection Faield!", type, error));
    }
  }
  async connectMongo(): Promise<void> {
    if (databaseEnabled.mongoOptions) {
      const { type, database } = mongoOptions;

      Database.dataSourceMongo = new DataSource(mongoOptions);
      Database.dataSourceMongo
        .initialize()
        .then(() => console.log("Successfully Connected!", type, database))
        .catch((error) => console.error("Connection Faield!", type, error));
    }
  }

  public static get mysql(): DataSource {
    return Database.dataSourceMysql;
  }

  public static get mongo(): DataSource {
    return Database.dataSourceMongo;
  }

  public get mysqlIsInitialized(): boolean {
    return Database.mysql?.isInitialized || false;
  }

  public get mongoIsInitialized(): boolean {
    return Database.mongo?.isInitialized || false;
  }
}
