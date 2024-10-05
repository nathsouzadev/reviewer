import { User } from '../../../../config/db/entities/users.entity';
import { User } from '../entities/user.entity';

export abstract class UserRepository {
  save(newUser: Promise<User>): import("../entities/user.entity").User | PromiseLike<import("../entities/user.entity").User> {
    throw new Error('Method not implemented.');
  }
  abstract create(user: User): Promise<User>;

}