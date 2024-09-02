import { UserRole } from '@common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'The email to be checked',
    example: 'johndoe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The type of user to check email for',
    example: UserRole.USER,
    enum: UserRole,
  })
  @IsOptional()
  @IsEnum(UserRole)
  userType?: UserRole;
}
