import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repository/users.repository';

@Injectable()
export class UsersService {
  constructor (
    private readonly userRepository: UserRepository
  ) {}

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
