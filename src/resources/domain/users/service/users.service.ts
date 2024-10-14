import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repository/users.repository';
import { User } from '../../../../config/db/entities/users.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = new User(createUserDto.name, createUserDto.email);
      const user = this.userRepository.create(newUser);
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async get(): Promise<User[]> {
    return this.userRepository.get();
  }

  async getById(id: string): Promise<User> {
    return this.userRepository.getById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return {
      id,
      email: updateUserDto.email,
      name: updateUserDto.name,
    };
  }

  async delete(id: string) {
    await this.userRepository.delete(id);
    return {
      id,
      message: 'User deleted',
    };
  }
}
