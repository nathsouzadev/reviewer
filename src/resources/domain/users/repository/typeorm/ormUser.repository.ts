import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users.repository';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ORMUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create = async (user: User) => this.usersRepository.save(user);
}
