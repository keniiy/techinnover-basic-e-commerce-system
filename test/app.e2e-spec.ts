import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(
        `I know you were expecting a message here 😔. Well, Oops, caught you snooping around! 😄 Since you're here, let me officially welcome you to the Techinnover API. May your requests be swift and your responses even swifter. Cheers to exploring our API—Hello World! 🥂`,
      );
  });
});
