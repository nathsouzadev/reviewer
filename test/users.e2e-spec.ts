import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import dataSource from '../src/config/db/dataSource';
import { randomUUID } from 'crypto';
import { generateMockUsers } from './helpers/generator';

describe('UsersController (e2e)', () => {
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

  it('should create user', async () => {
    return request(app.getHttpServer())
      .post('/api/users')
      .send({
        email: 'ada@reprograma.com.br',
        name: 'Ada Lovelace',
      })
      .expect(201)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          id: expect.any(String),
          email: 'ada@reprograma.com.br',
          name: 'Ada Lovelace',
        });

        const user = await dataSource.query(
          `SELECT * FROM users WHERE id = '${response.body.id}'`,
        );
        expect(user).toMatchObject([
          {
            id: response.body.id,
            email: 'ada@reprograma.com.br',
            name: 'Ada Lovelace',
          },
        ]);
      });
  });

  it('shloud return 400 when create user with invalid data', async () => {
    return request(app.getHttpServer())
      .post('/api/users')
      .send({
        email: '',
        name: '',
      })
      .expect(400)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          statusCode: 400,
          message: ['Required field', 'Invalid email', 'Required field'],
          error: 'Bad Request',
        });
      });
  });

  it('should throw 500 when create user with duplicated email', async () => {
    await generateMockUsers(randomUUID());

    return request(app.getHttpServer())
      .post('/api/users')
      .send({
        email: 'ada@reprograma.com.br',
        name: 'Ada Lovelace',
      })
      .expect(500);
  });

  it('should list all users', async () => {
    await generateMockUsers(randomUUID());

    return request(app.getHttpServer())
      .get('/api/users')
      .expect(200)
      .then(async (response) => {
        expect(response.body).toMatchObject([
          {
            id: expect.any(String),
            email: 'ada@reprograma.com.br',
            name: 'Ada Lovelace',
          },
          {
            id: expect.any(String),
            email: 'gracehooper@reprograma.com.br',
            name: 'Grace Hooper',
          },
        ]);
      });
  });

  it('should list one users', async () => {
    const mockUserId = randomUUID();
    await generateMockUsers(mockUserId);

    return request(app.getHttpServer())
      .get(`/api/users/${mockUserId}`)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          id: mockUserId,
          email: 'ada@reprograma.com.br',
          name: 'Ada Lovelace',
        });
      });
  });

  it('should update user', async () => {
    const mockUserId = randomUUID();
    await generateMockUsers(mockUserId);

    return request(app.getHttpServer())
      .patch(`/api/users/${mockUserId}`)
      .send({
        name: 'Ada Lovelace',
        email: 'ada.lovelace@reprograma.com',
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          id: mockUserId,
          email: 'ada.lovelace@reprograma.com',
          name: 'Ada Lovelace',
        });
      });
  });

  it('should delete user', async () => {
    const mockUserId = randomUUID();
    await generateMockUsers(mockUserId);

    return request(app.getHttpServer())
      .delete(`/api/users/${mockUserId}`)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          message: 'User deleted',
          id: mockUserId,
        });
      });
  });
});
