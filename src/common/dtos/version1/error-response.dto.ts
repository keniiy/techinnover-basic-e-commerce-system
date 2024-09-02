import { ApiProperty } from '@nestjs/swagger';
import { IErrorResponse } from '@interfaces/index';

export class ErrorResponseDto implements IErrorResponse {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Validation failed' })
  message: string;
}
