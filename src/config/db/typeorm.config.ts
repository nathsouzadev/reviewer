import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from './entities/users.entity';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('db.host'),
    port: configService.get('db.port'),
    username: configService.get('db.username'),
    password: configService.get('db.password'),
    database: configService.get('db.database'),
    entities: [User],
  }),
};
