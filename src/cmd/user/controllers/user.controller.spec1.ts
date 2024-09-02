import { Test, TestingModule } from '@nestjs/testing';
import { UserControllerVersion1 } from './user.controller1';
import { UserServiceVersion1 } from '../services/user.service1';

describe('UserControllerVersion1', () => {
  let controller: UserControllerVersion1;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserControllerVersion1],
      providers: [UserServiceVersion1],
    }).compile();

    controller = module.get<UserControllerVersion1>(UserControllerVersion1);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
