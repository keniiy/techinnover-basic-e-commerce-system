import { UserDocument } from '@common/DAL';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';

export class UserResponseDto {
  @ApiProperty({ example: '64e839c5f1a1b2c4d4f7890a' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'user' })
  role: string;

  constructor(partial: Partial<UserResponseDto>) {
    this.id = partial.id;
    this.name = partial.name;
    this.role = partial.role;
  }
}

@ApiExtraModels(UserResponseDto)
export class UserSuccessResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'User created successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    allOf: [{ $ref: getSchemaPath(UserResponseDto) }],
  })
  data: T;

  /**
   * Constructs a new UserSuccessResponseDto with the given properties.
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

export class UserErrorResponseDto {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Operation failed' })
  message: string;

  /**
   * Constructs a new UserErrorResponseDto with the given properties.
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

export class UserDeleteSuccessResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 204 })
  statusCode: number;

  @ApiProperty({ example: 'User deleted successfully' })
  message: string;

  /**
   * Constructs a new UserDeleteSuccessResponseDto with the given properties.
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

export class UserPaginatedResponseDto {
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

  @ApiProperty({ type: [UserResponseDto] })
  docs: UserResponseDto[];

  /**
   * Constructs a new UserPaginatedResponseDto from a PaginateResult of UserDocument.
   *
   * @param paginatedResult The PaginateResult<UserDocument> to construct from.
   */
  constructor(paginatedResult: PaginateResult<UserDocument>) {
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
    this.docs = paginatedResult.docs.map((user) => new UserResponseDto(user));
  }
}
