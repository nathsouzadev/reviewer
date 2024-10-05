import { IDBConfig } from './db.interface';
import { IGemini } from './gemini.interface';

export interface IConfig {
  port: number;
  gemini: IGemini
  db: IDBConfig;
}
