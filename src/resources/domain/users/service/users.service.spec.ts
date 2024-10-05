import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from '../repository/users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserRepository: UserRepository

  const createUserDto: CreateUserDto = {
    name: 'Ada Lovelace',
    email: 'ada@reprograma.com.br',
  };

  const mockUser = new User(createUserDto);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Ada Lovelace',
        email: 'ada@reprograma.com.br',
      };

      const result = await service.create(createUserDto);

      expect(result).toEqual(mockUser);  
});
});
});
