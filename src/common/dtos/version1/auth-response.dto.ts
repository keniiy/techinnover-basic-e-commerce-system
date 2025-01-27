import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  refreshToken: string;

  @ApiProperty({ example: '66d5f9b6838d25aaaaecc42e' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'user' })
  role: string;

  /**
   * Constructs a new AuthResponseDto with the given properties.
   * @param partial The object with the properties to copy to the new instance.
   */
  constructor(partial: Partial<AuthResponseDto>) {
    Object.assign(this, partial);
  }
}
