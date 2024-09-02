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
import { UserServiceVersion1 } from '../services/user.service1';

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
  /**
   * Retrieves the profile of the authenticated user.
   *
   * @param user The authenticated user making the request.
   * @returns A promise that resolves to a UserSuccessResponseDto containing the user document, or a UserErrorResponseDto if the user is not found.
   */
  async getProfile(@AuthenticatedUser() user: IUserAuthenticated) {
    return this.userService.getProfile(user.id);
  }
}
