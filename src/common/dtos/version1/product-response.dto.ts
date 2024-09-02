import { ProductDocument } from '@common/DAL/products/models';
import { UserResponseDto } from '@common/index';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';

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

  @ApiProperty({ type: UserResponseDto })
  owner: UserResponseDto;

  @ApiProperty({ example: false })
  isApproved: boolean;

  @ApiProperty({ example: '2024-08-31T01:41:20.407Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-08-31T01:41:20.407Z' })
  updatedAt: Date;

  /**
   * Constructs a new ProductResponseDto from a ProductDocument.
   *
   * @param product The ProductDocument to construct from.
   */
  constructor(product: ProductDocument, owner: UserResponseDto) {
    this.id = product._id.toString();
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
    this.quantity = product.quantity;
    this.ownerId = product.ownerId;
    this.owner = owner;
    this.isApproved = product.isApproved;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }
}

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

  /**
   * Constructs a new ProductSuccessResponseDto with the given properties.
   *
   * @param statusCode The HTTP status code to include in the response.
   * @param message The message to include in the response.
   * @param data The data to include in the response.
   */
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

  /**
   * Constructs a new ProductErrorResponseDto with the given properties.
   *
   * @param statusCode The HTTP status code to include in the response.
   * @param message The message to include in the response.
   */
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

  /**
   * Constructs a new ProductDeleteSuccessResponseDto with the given properties.
   *
   * @param statusCode The HTTP status code to include in the response.
   * @param message The message to include in the response.
   */
  constructor(statusCode: number, message: string) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
  }
}

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

  /**
   * Constructs a new ProductPaginatedResponseDto from a PaginateResult of ProductDocument.
   *
   * @param paginatedResult The PaginateResult<ProductDocument> to construct from.
   */
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
      (product, index) => new ProductResponseDto(product, owners[index]),
    );
  }
}
