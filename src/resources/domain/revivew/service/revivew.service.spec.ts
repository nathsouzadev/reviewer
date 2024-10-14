import { Test, TestingModule } from '@nestjs/testing';
import { RevivewService } from './revivew.service';
import { GeminiService } from '../../../../resources/client/gemini/gemini.service';
import { UsersService } from '../../users/service/users.service';

describe('RevivewService', () => {
  let service: RevivewService;
  let mockGeminiService: GeminiService;
  let mockUserService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RevivewService,
        {
          provide: UsersService,
          useValue: {
            getByEmail: jest.fn(),
          },
        },
        {
          provide: GeminiService,
          useValue: {
            review: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RevivewService>(RevivewService);
    mockGeminiService = module.get<GeminiService>(GeminiService);
    mockUserService = module.get<UsersService>(UsersService);
  });

  it('should return review', async () => {
    const mockEmail = 'ada@reprograma.com.br';
    jest.spyOn(mockGeminiService, 'review').mockImplementation(() =>
      Promise.resolve({
        review: '## Code Review Feedback for PR #15',
      }),
    );

    const mockReviewDto = {
      email: mockEmail,
      url: 'https://github.com/ada/repo/pull/15',
    };

    const response = await service.review(mockReviewDto);
    expect(mockUserService.getByEmail).toHaveBeenCalledWith(mockEmail);
    expect(mockGeminiService.review).toHaveBeenCalledWith(mockReviewDto.url);
    expect(response).toMatchObject({
      review: '## Code Review Feedback for PR #15',
    });
  });

  it('should throw error if user not found', async () => {
    const mockEmail = 'ada@reprograma.com.br';

    const mockReviewDto = {
      email: mockEmail,
      url: 'https://github.com/ada/repo/pull/15',
    };

    jest.spyOn(mockUserService, 'getByEmail').mockImplementation(() => {
      throw new Error('User not found');
    });

    await expect(service.review(mockReviewDto)).rejects.toThrowError(
      'User not found',
    );
    expect(mockGeminiService.review).not.toHaveBeenCalled();
  });
});
