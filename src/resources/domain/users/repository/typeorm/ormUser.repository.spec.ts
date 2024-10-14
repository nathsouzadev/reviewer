import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../../../config/db/entities/users.entity';
import { Repository } from 'typeorm';
import { ORMUserRepository } from './ormUser.repository';
import { randomUUID } from 'crypto';

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
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    ormUserRepository = module.get<ORMUserRepository>(ORMUserRepository);
    mockRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be create user', async () => {
    const mockUser = new User('Ada Lovelace', 'ada@reprograma.com.br');

    await ormUserRepository.create(mockUser);
    expect(mockRepository.save).toBeCalledWith(mockUser);
  });

  it('should return users list', async () => {
    await ormUserRepository.get();
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should return one user', async () => {
    const mockUserId = randomUUID();
    await ormUserRepository.getById(mockUserId);
    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { id: mockUserId },
    });
  });

  it('should update an user', async () => {
    const mockUserId = randomUUID();
    const mockUserData = {
      name: 'Grace Hooper',
      email: 'gracehooper@reprograma.com',
    };
    await ormUserRepository.update(mockUserId, mockUserData);
    expect(mockRepository.update).toHaveBeenCalledWith(
      { id: mockUserId },
      { name: mockUserData.name, email: mockUserData.email },
    );
  });

  it('should delete an user', async () => {
    const mockUserId = randomUUID();
    await ormUserRepository.delete(mockUserId);
    expect(mockRepository.delete).toHaveBeenCalledWith(mockUserId);
  });

  it('should return user by email', async () => {
    const mockUserEmail = 'ada@reprograma.com';

    await ormUserRepository.getByEmail(mockUserEmail);
    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { email: mockUserEmail },
    });
  });
});
