import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from '../repository/users.repository';
import { randomUUID } from 'crypto';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            get: jest.fn(),
            getById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    mockUserRepository = module.get<UserRepository>(UserRepository);
  });

  it('should create user', async () => {
    const mockUserDto = {
      email: 'ada@reprograma.com.br',
      name: 'Ada Lovelace',
    };

    jest.spyOn(mockUserRepository, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        id: randomUUID(),
        ...mockUserDto,
      }),
    );

    const response = await service.create(mockUserDto);
    expect(mockUserRepository.create).toHaveBeenCalledWith({
      id: expect.any(String),
      ...mockUserDto,
    });
    expect(response).toMatchObject({
      id: expect.any(String),
      ...mockUserDto,
    });
  });

  it('should return all users', async () => {
    const mockUsers = [
      {
        id: randomUUID(),
        email: 'ada@reprograma.com.br',
        name: 'Ada Lovelace',
      },
      {
        id: randomUUID(),
        email: 'gracehooper@reprograma.com.br',
        name: 'Grace Hooper',
      },
    ];

    jest
      .spyOn(mockUserRepository, 'get')
      .mockImplementationOnce(() => Promise.resolve(mockUsers));

    const response = await service.get();
    expect(mockUserRepository.get).toHaveBeenCalled();
    expect(response).toMatchObject(mockUsers);
  });

  it('should return one user', async () => {
    const mockUser = {
      id: randomUUID(),
      email: 'ada@reprograma.com.br',
      name: 'Ada Lovelace',
    };

    jest
      .spyOn(mockUserRepository, 'getById')
      .mockImplementationOnce(() => Promise.resolve(mockUser));

    const response = await service.getById(mockUser.id);
    expect(mockUserRepository.getById).toHaveBeenCalledWith(mockUser.id);
    expect(response).toMatchObject(mockUser);
  });

  it('should return an updated user', async () => {
    const mockUserId = randomUUID();
    const mockUserData = {
      name: 'Grace Hooper',
      email: 'gracehooper@reprograma.com',
    };
    jest.spyOn(mockUserRepository, 'update');

    await service.update(mockUserId, mockUserData);
    expect(mockUserRepository.update).toHaveBeenCalledWith(
      mockUserId,
      mockUserData,
    );
  });

  it('should delete an user', async () => {
    const mockUserId = randomUUID();
    jest.spyOn(mockUserRepository, 'delete');

    const response = await service.delete(mockUserId);

    expect(mockUserRepository.delete).toHaveBeenCalledWith(mockUserId);
    expect(response).toBe(true);
  }); 
});
