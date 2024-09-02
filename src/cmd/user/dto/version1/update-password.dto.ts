import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    example: 'currentPassword123',
    description: 'Current password of the user',
  })
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    example: 'newPassword123',
    description: 'New password for the user',
  })
  newPassword: string;
}
