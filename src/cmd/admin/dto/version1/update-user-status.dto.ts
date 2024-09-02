import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { UserStatus } from '@common/enums';

export class UpdateUserStatusDto {
  @IsString()
  @ApiProperty({ example: '64e839c5f1a1b2c4d4f7890a', description: 'User ID' })
  userId: string;

  @IsEnum(UserStatus)
  @ApiProperty({
    example: UserStatus.BANNED,
    description: 'Set to BANNED to ban the user, ACTIVE to unban',
  })
  status: UserStatus.BANNED;
}
