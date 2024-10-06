import { User } from '../../../../config/db/entities/users.entity';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract get(): Promise<User[]>;
  abstract getById(id: string): Promise<User>;
}
