import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards';
import { AuthenticatedUser } from '@common/decorators';
import { IUserAuthenticated } from '@common/interfaces';
import {
  UserSuccessResponseDto,
  UserErrorResponseDto,
  UserResponseDto,
} from '@common/dtos';
import { UserServiceVersion1 } from '../services/user.service';

@ApiTags('User Management V1')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'user',
  version: '1',
})
export class UserControllerVersion1 {
  constructor(private readonly userService: UserServiceVersion1) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get User Profile (Authenticated Users Only)' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: UserSuccessResponseDto<UserResponseDto>,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: UserErrorResponseDto,
  })
  async getProfile(@AuthenticatedUser() user: IUserAuthenticated) {
    return this.userService.getProfile(user.id);
  }
}
