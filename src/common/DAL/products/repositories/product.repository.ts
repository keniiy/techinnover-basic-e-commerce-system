import { AbstractRepository } from '@common/DAL/abstract';
import { Collections } from '@common/enums';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { ProductDocument } from '../models';

@Injectable()
export class ProductRepository extends AbstractRepository<ProductDocument> {
  /**
   * Creates an instance of ProductRepository.
   *
   * @param productModel The mongoose model for the products collection.
   * @param connection The mongoose connection to use.
   */
  constructor(
    @InjectModel(Collections.PRODUCTS)
    private readonly productModel: Model<ProductDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(productModel, connection);
  }
}
