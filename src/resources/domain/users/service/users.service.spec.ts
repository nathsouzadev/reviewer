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
});
