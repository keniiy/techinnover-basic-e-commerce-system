import { UserSchema, UserRepository } from '@common/DAL';
import { ProductSchema } from '@common/DAL/products/models';
import { ProductRepository } from '@common/DAL/products/repositories/product.repository';
import { Collections } from '@common/enums';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductControllerVersion1 } from './controllers/product.controller1';
import { ProductServiceVersion1 } from './services/product.service1';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Collections.PRODUCTS, schema: ProductSchema },
      { name: Collections.USERS, schema: UserSchema },
    ]),
  ],
  controllers: [ProductControllerVersion1],
  providers: [ProductServiceVersion1, ProductRepository, UserRepository],
})
export class ProductModule {}
