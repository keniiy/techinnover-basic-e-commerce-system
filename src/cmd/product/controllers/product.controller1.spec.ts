import { Test, TestingModule } from '@nestjs/testing';
import { ProductControllerVersion1 } from './product.controller1';
import { ProductServiceVersion1 } from '../services/product.service1';

describe('ProductControllerVersion1', () => {
  let controller: ProductControllerVersion1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductControllerVersion1],
      providers: [ProductServiceVersion1],
    }).compile();

    controller = module.get<ProductControllerVersion1>(
      ProductControllerVersion1,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
