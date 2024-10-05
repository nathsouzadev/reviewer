import { IConfig } from './interface/config.interface';

export default (): IConfig => ({
  port: parseInt(process.env.PORT) || 3000,
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
  },
});
