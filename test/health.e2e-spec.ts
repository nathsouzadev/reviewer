import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import dataSource from '../src/config/db/dataSource';

describe('HealthController (e2e)', () => {
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
    await dataSource.destroy();
    await app.close();
  });

  it('health check', async () => {
    return request(app.getHttpServer())
      .get('/api/health')
      .expect(200)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          social: {
            status: 'up',
          },
        });
      });
  });
});
