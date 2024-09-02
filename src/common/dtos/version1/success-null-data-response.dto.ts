import { ApiProperty } from '@nestjs/swagger';

export class SuccessNullDataResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Operation successful' })
  message: string;

  @ApiProperty({ type: 'null', nullable: true, example: null })
  data: null;

  constructor(statusCode: number, message: string) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
  }
}
