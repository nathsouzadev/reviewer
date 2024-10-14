import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../../../../config/db/entities/users.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract get(): Promise<User[]>;
  abstract getById(id: string): Promise<User>;
  abstract update(id: string, user: UpdateUserDto): Promise<UpdateResult>;
  abstract delete(id: string): Promise<DeleteResult>;
  abstract getByEmail(email: string): Promise<User>;
}
