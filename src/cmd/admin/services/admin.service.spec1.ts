import { Test, TestingModule } from '@nestjs/testing';
import { AdminServiceVersion1 } from './admin.service1';

describe('AdminServiceVersion1', () => {
  let service: AdminServiceVersion1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminServiceVersion1],
    }).compile();

    service = module.get<AdminServiceVersion1>(AdminServiceVersion1);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
