import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users.repository';
import { User } from '../../../../../config/db/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ORMUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create = async (user: User): Promise<User> => this.usersRepository.save(user);
  get = async (): Promise<User[]> => this.usersRepository.find();
  getById = async (id: string): Promise<User> => this.usersRepository.findOne({ where: { id } });
}
