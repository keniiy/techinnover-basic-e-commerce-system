import { ApiProperty } from '@nestjs/swagger';

export class EmailAvailabilityResponseDto {
  @ApiProperty({ example: true })
  available: boolean;

  constructor(available: boolean) {
    this.available = available;
  }
}

export class EmailFalseAvailabilityResponseDto {
  @ApiProperty({ example: true })
  available: boolean;

  constructor(available: boolean) {
    this.available = available;
  }
}
