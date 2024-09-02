import { Test, TestingModule } from '@nestjs/testing';
import { UserServiceVersion1 } from './user.service1';

describe('UserServiceVersion1', () => {
  let service: UserServiceVersion1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserServiceVersion1],
    }).compile();

    service = module.get<UserServiceVersion1>(UserServiceVersion1);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
