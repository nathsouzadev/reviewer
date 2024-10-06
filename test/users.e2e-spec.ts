import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import dataSource from '../src/config/db/dataSource';
import { randomUUID } from 'crypto';

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

  it('should list all users', async () => {
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
    for (const user of mockUsers) {
      await dataSource.query(
        `insert into users (id, email, name) values ('${user.id}','${user.email}', '${user.name}')`,
      );
    }
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
    for (const user of mockUsers) {
      await dataSource.query(
        `insert into users (id, email, name) values ('${user.id}','${user.email}', '${user.name}')`,
      );
    }
    return request(app.getHttpServer())
      .get('/api/users/id')
      .expect(200)
      .then(async (response) => {
        expect(response.body[0]).toMatchObject([
          {
            id: expect.any(String),
            email: 'ada@reprograma.com.br',
            name: 'Ada Lovelace',
          },
        ]);
      });
  });
});
