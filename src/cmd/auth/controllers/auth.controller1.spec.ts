import { Test, TestingModule } from '@nestjs/testing';
import { AuthControllerVersion1 } from './auth.controller1';
import { AuthServiceVersion1 } from '../services/auth.service1';

describe('AuthControllerVersion1', () => {
  let controller: AuthControllerVersion1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthControllerVersion1],
      providers: [AuthServiceVersion1],
    }).compile();

    controller = module.get<AuthControllerVersion1>(AuthControllerVersion1);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
