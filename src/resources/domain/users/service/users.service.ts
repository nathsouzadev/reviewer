import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repository/users.repository';
import { User } from '../../../../config/db/entities/users.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User(createUserDto.name, createUserDto.email);
    return this.userRepository.create(newUser);
  }

  async get(): Promise<User[]> {
    return this.userRepository.get();
  }

  async getById(id: string): Promise<User> {
    return this.userRepository.getById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }
}
