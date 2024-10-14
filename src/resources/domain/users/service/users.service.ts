import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
    const users = await this.userRepository.get();

    if (users.length === 0) {
      throw new NotFoundException('Users not found');
    }

    return users;
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
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

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
