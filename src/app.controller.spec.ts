import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Cheers to exploring our API—Hello World!"', () => {
      expect(appController.getWelcomeMessageToClient()).toBe(
        `I know you were expecting a message here 😔. Well, Oops, caught you snooping around! 😄 Since you're here, let me officially welcome you to the Techinnover API. May your requests be swift and your responses even swifter. Cheers to exploring our API—Hello World! 🥂`,
      );
    });
  });
});
