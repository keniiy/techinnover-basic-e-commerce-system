import { ProductDocument } from '@common/DAL/products/models';
import { UserResponseDto, UserRole } from '@common/index';
import { ApiProperty, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';
import mongoose, { PaginateResult } from 'mongoose';

export class ProductResponseDto {
  @ApiProperty({ example: '64e839c5f1a1b2c4d4f7890b' })
  id: string;

  @ApiProperty({ example: 'Laptop' })
  name: string;

  @ApiProperty({ example: 999.99 })
  price: number;

  @ApiProperty({ example: 'A high-performance laptop.' })
  description: string;

  @ApiProperty({ example: 10 })
  quantity: number;

  @ApiProperty({ example: '64e839c5f1a1b2c4d4f7890a' })
  ownerId: string;

  @ApiProperty({ type: () => UserResponseDto })
  owner: UserResponseDto;

  @ApiProperty({ example: true })
  isApproved: boolean;

  @ApiProperty({ example: '2024-08-31T01:41:20.407Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-08-31T01:41:20.407Z' })
  updatedAt: Date;

  /**
   * Constructs a new ProductResponseDto from a ProductDocument and UserResponseDto.
   *
   * @param product The ProductDocument to construct from.
   * @param owner The UserResponseDto for the owner of the product.
   */
  constructor(product: ProductDocument, owner: UserResponseDto) {
    this.id = product._id.toString();
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
    this.quantity = product.quantity;
    this.ownerId = product.ownerId.toString();
    this.owner = owner;
    this.isApproved = product.isApproved;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }
}

@ApiExtraModels(ProductResponseDto)
export class ProductSuccessResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Product created successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    allOf: [{ $ref: getSchemaPath(ProductResponseDto) }],
  })
  data: T;

  constructor(statusCode: number, message: string, data: T) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export class ProductErrorResponseDto {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Operation failed' })
  message: string;

  constructor(statusCode: number, message: string) {
    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class ProductDeleteSuccessResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 204 })
  statusCode: number;

  @ApiProperty({ example: 'Product deleted successfully' })
  message: string;

  constructor(statusCode: number, message: string) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
  }
}

@ApiExtraModels(ProductResponseDto)
export class ProductPaginatedResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  hasNextPage: boolean;

  @ApiProperty({ type: Boolean, example: true })
  hasPrevPage: boolean;

  @ApiProperty({ type: Number, example: 10 })
  limit: number;

  @ApiProperty({ type: Number, example: 0 })
  offset: number;

  @ApiProperty({ type: Number, example: 2 })
  page: number;

  @ApiProperty({ type: Number, example: 11 })
  pagingCounter: number;

  @ApiProperty({ type: Number, example: 23 })
  totalDocs: number;

  @ApiProperty({ type: Number, example: 3 })
  totalPages: number;

  @ApiProperty({ type: Number, example: 3, required: false })
  nextPage?: number;

  @ApiProperty({ type: Number, example: 1, required: false })
  prevPage?: number;

  @ApiProperty({ type: [ProductResponseDto] })
  docs: ProductResponseDto[];

  constructor(
    paginatedResult: PaginateResult<ProductDocument>,
    owners: UserResponseDto[],
  ) {
    this.hasNextPage = paginatedResult.hasNextPage;
    this.hasPrevPage = paginatedResult.hasPrevPage;
    this.limit = paginatedResult.limit;
    this.offset = paginatedResult.offset;
    this.page = paginatedResult.page;
    this.pagingCounter = paginatedResult.pagingCounter;
    this.totalDocs = paginatedResult.totalDocs;
    this.totalPages = paginatedResult.totalPages;
    this.nextPage = paginatedResult.nextPage;
    this.prevPage = paginatedResult.prevPage;
    this.docs = paginatedResult.docs.map(
      (product, index) =>
        new ProductResponseDto(
          product,
          owners[index] ||
            new UserResponseDto({
              id: new mongoose.Types.ObjectId().toString(),
              name: 'Unknown',
              role: UserRole.USER,
            }),
        ),
    );
  }
}
