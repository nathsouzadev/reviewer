import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users.repository';
import { User } from '../../../../../config/db/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../../dto/update-user.dto';

@Injectable()
export class ORMUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create = async (user: User): Promise<User> => this.usersRepository.save(user);

  get = async (): Promise<User[]> => this.usersRepository.find();

  getById = async (id: string): Promise<User> =>
    this.usersRepository.findOne({ where: { id } });

  update = async (id: string, userUpdated: UpdateUserDto) =>
    this.usersRepository.update(
      { id },
      { name: userUpdated.name, email: userUpdated.email },
    );

  delete = async (id: string) => this.usersRepository.delete(id);

  getByEmail = async (email: string): Promise<User> =>
    this.usersRepository.findOne({ where: { email } });
}
