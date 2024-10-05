import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { ORMUserRepository } from './ormUser.repository';

describe('ormUserRepository', () => {
  let ormUserRepository: ORMUserRepository;
  let mockRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ORMUserRepository,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    ormUserRepository = module.get<ORMUserRepository>(ORMUserRepository);
    mockRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be create user', async () => {
    const mockUser = new User({
      email: 'ada@reprograma.com.br',
      name: 'Ada Lovelace',
    });

    await ormUserRepository.create(mockUser);
    expect(mockRepository.save).toBeCalledWith(mockUser);
  });
});
