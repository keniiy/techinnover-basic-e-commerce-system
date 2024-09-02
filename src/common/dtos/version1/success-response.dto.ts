import { UserResponseDto } from '@common/index';
import { ApiProperty, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(UserResponseDto)
export class SuccessResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Operation successful' })
  message: string;

  @ApiProperty({
    oneOf: [{ type: 'null' }, { $ref: getSchemaPath(UserResponseDto) }],
    nullable: true,
  })
  data: T | null;

  constructor(statusCode: number, message: string, data: T | null) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
