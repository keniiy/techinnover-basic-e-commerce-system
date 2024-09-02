import { Controller, Post, Body, Patch, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthServiceVersion1 } from '../services/auth.service1';
import { ChangePasswordDto, LoginDto, RefreshTokenDto } from '../dto/version1';
import {
  UserSuccessResponseDto,
  UserErrorResponseDto,
  AuthResponseDto,
  SuccessNullDataResponseDto,
} from '@common/dtos';
import { JwtAuthGuard } from '@common/guards';
import { AuthenticatedUser } from '@common/decorators';
import { IUserAuthenticated } from '@common/interfaces';

@ApiTags('Authentication V1')
@ApiBearerAuth()
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthControllerVersion1 {
  constructor(private readonly authService: AuthServiceVersion1) {}

  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiBody({ type: LoginDto, description: 'User login credentials' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: UserSuccessResponseDto<AuthResponseDto>,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    type: UserErrorResponseDto,
  })
  /**
   * Logs in a user and generates a JWT token based on the user's role.
   * @param loginDto The user's login credentials.
   * @returns A promise that resolves to a UserSuccessResponseDto containing the JWT token for the user.
   */
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Change Password' })
  @ApiBody({ type: ChangePasswordDto, description: 'Change password details' })
  @ApiResponse({
    status: 200,
    description: 'Password changed successfully',
    type: SuccessNullDataResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request',
    type: UserErrorResponseDto,
  })
  /**
   * Changes the password of the authenticated user.
   * @param changePasswordDto The change password details.
   * @returns A promise that resolves to a UserSuccessResponseDto indicating that the password was changed successfully.
   */
  async changePassword(
    @AuthenticatedUser() user: IUserAuthenticated,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(user.id, changePasswordDto);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh Access Token' })
  @ApiBody({ type: RefreshTokenDto, description: 'Refresh token request' })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    type: UserSuccessResponseDto<AuthResponseDto>,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid or expired refresh token',
    type: UserErrorResponseDto,
  })
  /**
   * Refreshes the access token for the user with the given refresh token.
   * @param refreshTokenDto The refresh token details.
   * @returns A promise that resolves to a UserSuccessResponseDto containing the new access token.
   */
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
