import { resolve } from 'path';
import { DataSourceOptions } from 'typeorm';
export const sourcepath = resolve(__dirname, '../../');

export const mysqlOptions: DataSourceOptions = {
  type: 'mysql',
  name: 'CustomerDataBase',
  host: '127.0.0.1',
  port: 3306,
  acquireTimeout: 60 * 60 * 1000,
  connectTimeout:60 * 60 * 1000,
  database: 'dev_models',
  username: 'dev',
  password: 'dev',
  logging: ['error'],
  entities: [`${sourcepath}/entities/sql/**/*.js`],
};

export const databaseEnabled ={
  mysqlOptions: true
}