import { Test, TestingModule } from '@nestjs/testing';
import { GeminiService } from './gemini.service';
import { ConfigService } from '@nestjs/config';

const mockGenerateContent = jest
  .fn()
  .mockImplementation(() => ({
    response: {
      candidates: [
        { content: { parts: [{ text: '## Code Review Feedback for PR #5' }] } },
      ],
    },
  }));

jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockImplementation(() => ({
      generateContent: mockGenerateContent,
    })),
  })),
  HarmBlockThreshold: jest.fn().mockImplementation(() => ({
    HARM_BLOCK_THRESHOLD_UNSPECIFIED: 'HARM_BLOCK_THRESHOLD_UNSPECIFIED',
    BLOCK_LOW_AND_ABOVE: 'BLOCK_LOW_AND_ABOVE',
    BLOCK_MEDIUM_AND_ABOVE: 'BLOCK_MEDIUM_AND_ABOVE',
    BLOCK_ONLY_HIGH: 'BLOCK_ONLY_HIGH',
    BLOCK_NONE: 'BLOCK_NONE',
  })),
  HarmCategory: jest.fn().mockImplementation(() => ({
    HARM_CATEGORY_UNSPECIFIED: 'HARM_CATEGORY_UNSPECIFIED',
    HARM_CATEGORY_HATE_SPEECH: 'HARM_CATEGORY_HATE_SPEECH',
    HARM_CATEGORY_SEXUALLY_EXPLICIT: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
    HARM_CATEGORY_HARASSMENT: 'HARM_CATEGORY_HARASSMENT',
    HARM_CATEGORY_DANGEROUS_CONTENT: 'HARM_CATEGORY_DANGEROUS_CONTENT',
  })),
}));

describe('GeminiService', () => {
  let service: GeminiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeminiService,
        {
          provide: ConfigService,
          useValue: {
            get: jest
              .fn()
              .mockReturnValueOnce('AIzaSyDs_7e74bX2mkZ8HwUibRswwP0kmMLeEDw'),
          },
        },
      ],
    }).compile();

    service = module.get<GeminiService>(GeminiService);
  });

  it('should be return gemini response', async () => {
    const mockUrl = 'https://github.com/nathsouzadev/reviewer/pull/5';

    const response = await service.review(mockUrl);
    expect(mockGenerateContent).toHaveBeenCalledWith(mockUrl);
    expect(response).toMatchObject({
      text: '## Code Review Feedback for PR #5',
    });
  });
});
