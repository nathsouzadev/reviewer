import { Test, TestingModule } from '@nestjs/testing';
import { RevivewService } from './revivew.service';
import { GeminiService } from '../../../../resources/client/gemini/gemini.service';

describe('RevivewService', () => {
  let service: RevivewService;
  let mockGeminiService: GeminiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RevivewService,
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
  });

  it('should return review', async () => {
    jest.spyOn(mockGeminiService, 'review').mockImplementation(() =>
      Promise.resolve({
        review: '## Code Review Feedback for PR #15',
      }),
    );

    const mockReviewDto = {
      email: 'ada@reprograma.com.br',
      url: 'https://github.com/ada/repo/pull/15',
    };

    const response = await service.review(mockReviewDto);
    expect(mockGeminiService.review).toHaveBeenCalledWith(mockReviewDto.url);
    expect(response).toMatchObject({
      review: '## Code Review Feedback for PR #15',
    });
  });
});
