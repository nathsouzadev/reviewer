import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/users.repository';
import { ORMUserRepository } from './repository/typeorm/ormUser.repository';
import { User } from '../../../config/db/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: UserRepository, useClass: ORMUserRepository },
  ],
})
export class UsersModule {}
