import { IDBConfig } from './db.interface';

export interface IConfig {
  port: number;
  db: IDBConfig;
}
