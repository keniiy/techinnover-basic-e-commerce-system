import { Test, TestingModule } from '@nestjs/testing';
import { AdminControllerVersion1 } from './admin.controller1';
import { AdminServiceVersion1 } from '../services/admin.service1';

describe('AdminController', () => {
  let controller: AdminControllerVersion1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminControllerVersion1],
      providers: [AdminServiceVersion1],
    }).compile();

    controller = module.get<AdminControllerVersion1>(AdminControllerVersion1);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
