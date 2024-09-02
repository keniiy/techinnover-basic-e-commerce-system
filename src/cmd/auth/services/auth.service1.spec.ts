import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceVersion1 } from './auth.service1';

describe('AuthService', () => {
  let service: AuthServiceVersion1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthServiceVersion1],
    }).compile();

    service = module.get<AuthServiceVersion1>(AuthServiceVersion1);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
