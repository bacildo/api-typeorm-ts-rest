import { resolve } from 'path';
import { DataSourceOptions } from 'typeorm';
export const sourcepath = resolve(__dirname, '../../');

export const mysqlOptions: DataSourceOptions = {
  type: 'mysql',
  name: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  acquireTimeout: 60 * 60 * 1000,
  connectTimeout:60 * 60 * 1000,
  database: 'dev_models',
  username: 'dev',
  password: 'dev',
  logging: ['error'],
  entities: [`${sourcepath}/entities/sql/*.{js,ts}`],

};

export const mongoOptions: DataSourceOptions = {
  type: 'mongodb',
  name: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'dev',
  useUnifiedTopology: true,
  logging: ['error'],
  entities: [`${sourcepath}/entities/mongodb/*.{js,ts}`],
};


export const databaseEnabled ={
  mysqlOptions: true,
  mongoOptions:true
}

export const serverPort = {
  port: 3000
}