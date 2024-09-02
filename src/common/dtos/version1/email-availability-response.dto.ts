import { ApiProperty } from '@nestjs/swagger';

export class EmailAvailabilityResponseDto {
  @ApiProperty({ example: true })
  available: boolean;

  /**
   * Constructs a new EmailAvailabilityResponseDto with the given
   * boolean value indicating whether the given email is available
   * or not.
   *
   * @param available True if the email is available, false otherwise.
   */
  constructor(available: boolean) {
    this.available = available;
  }
}

export class EmailFalseAvailabilityResponseDto {
  @ApiProperty({ example: true })
  available: boolean;

  /**
   * Constructor for EmailFalseAvailabilityResponseDto.
   *
   * @param available - Whether the email is available.
   */
  constructor(available: boolean) {
    this.available = available;
  }
}
