import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import dataSource from '../src/config/db/dataSource';
import { generateMockUsers } from './helpers/generator';
import { randomUUID } from 'crypto';

const mockGenerateContent = jest.fn().mockImplementation(() => ({
  response: {
    candidates: [
      { content: { parts: [{ text: '## Code Review Feedback for PR #15' }] } },
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

describe('ReviewController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await dataSource.initialize();
  });

  afterEach(async () => {
    await dataSource.query('DELETE FROM users');
    await dataSource.destroy();
    await app.close();
  });

  it('should return code review', async () => {
    await generateMockUsers(randomUUID());

    return request(app.getHttpServer())
      .post('/api/review')
      .send({
        email: 'ada@reprograma.com.br',
        url: 'https://github.com/ada/repo/pull/15',
      })
      .expect(201)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          review: '## Code Review Feedback for PR #15',
        });
      });
  });

  it('should return error if user not exists', async () => {
    return request(app.getHttpServer())
      .post('/api/review')
      .send({
        email: 'ada@reprograma.com.br',
        url: 'https://github.com/ada/repo/pull/15',
      })
      .expect(404)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          message: 'User not found',
        });
      });
  });
});
