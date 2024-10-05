import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { router } from './config/router';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/interface/config.schema';
import { HealthModule } from './health/health.module';
import config from './config/config';
import { LoggerMiddleware } from './config/logger-middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/db/typeorm.config';
import { UsersModule } from './resources/domain/users/users.module';
import { GeminiModule } from './resources/client/gemini/gemini.module';
import { RevivewModule } from './resources/domain/revivew/revivew.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [config],
    }),
    RouterModule.register(router),
    HealthModule,
    UsersModule,
    GeminiModule,
    RevivewModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
