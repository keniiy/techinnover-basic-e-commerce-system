import { Test, TestingModule } from '@nestjs/testing';
import { ProductServiceVersion1 } from './product.service1';

describe('ProductServiceVersion1', () => {
  let service: ProductServiceVersion1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductServiceVersion1],
    }).compile();

    service = module.get<ProductServiceVersion1>(ProductServiceVersion1);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
