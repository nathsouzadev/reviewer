import { Module } from '@nestjs/common';
import { RevivewService } from './service/revivew.service';
import { RevivewController } from './revivew.controller';
import { GeminiService } from '../../../resources/client/gemini/gemini.service';
import { UsersService } from '../users/service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../config/db/entities/users.entity';
import { UserRepository } from '../users/repository/users.repository';
import { ORMUserRepository } from '../users/repository/typeorm/ormUser.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RevivewController],
  providers: [
    RevivewService,
    GeminiService,
    UsersService,
    { provide: UserRepository, useClass: ORMUserRepository },
  ],
})
export class RevivewModule {}
