import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@common/DAL/users/repositories/user.repository';
import {
  AuthResponseDto,
  UserSuccessResponseDto,
  UserErrorResponseDto,
} from '@common/dtos';
import { LoginDto, ChangePasswordDto, RefreshTokenDto } from '../dto/version1';
import { comparePassword, hashPassword } from '@common/utils';
import { HttpStatus } from '@nestjs/common';
import { TokenService } from '@common/integrations';
import { UserStatus } from '@common/enums';

@Injectable()
export class AuthServiceVersion1 {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<AuthResponseDto | null> {
    const user = await this.userRepository.findOne({ email });

    if (!user) return null;

    if (user.status === UserStatus.BANNED) {
      throw new UnauthorizedException('Your account has been banned.');
    }

    if (await comparePassword(pass, user.password)) {
      const { _id, name, role } = user;
      const { accessToken, refreshToken } =
        await this.tokenService.handleCreateTokens(_id.toString(), role);

      return {
        accessToken,
        refreshToken,
        id: _id.toString(),
        name,
        role,
      };
    }

    return null;
  }

  async login(
    loginDto: LoginDto,
  ): Promise<UserSuccessResponseDto<AuthResponseDto> | UserErrorResponseDto> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      return new UserErrorResponseDto(
        HttpStatus.UNAUTHORIZED,
        'Invalid credentials',
      );
    }
    return new UserSuccessResponseDto(
      HttpStatus.OK,
      `${user.role} logged in successfully`,
      user,
    );
  }

  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<UserSuccessResponseDto<void> | UserErrorResponseDto> {
    const user = await this.userRepository.findOne({ _id: userId });
    if (!user) {
      return new UserErrorResponseDto(
        HttpStatus.UNAUTHORIZED,
        'User not found',
      );
    }

    const passwordsMatch = await comparePassword(
      changePasswordDto.currentPassword,
      user.password,
    );
    if (!passwordsMatch) {
      return new UserErrorResponseDto(
        HttpStatus.BAD_REQUEST,
        'Current password is incorrect',
      );
    }

    user.password = await hashPassword(changePasswordDto.newPassword);
    await this.userRepository.findOneAndUpdate({ _id: userId }, user);

    return new UserSuccessResponseDto(
      HttpStatus.OK,
      'Password changed successfully',
      null,
    );
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<UserSuccessResponseDto<AuthResponseDto> | UserErrorResponseDto> {
    const decoded = await this.tokenService.verifyToken(
      refreshTokenDto.refreshToken,
    );

    const user = await this.userRepository.findById(decoded.userId);

    if (!user) {
      return new UserErrorResponseDto(
        HttpStatus.UNAUTHORIZED,
        'User not found',
      );
    }

    const { accessToken, refreshToken } =
      await this.tokenService.handleCreateTokens(
        user._id.toString(),
        user.role,
      );

    return new UserSuccessResponseDto(
      HttpStatus.OK,
      'Token refreshed successfully',
      {
        accessToken,
        refreshToken,
        id: user._id.toString(),
        name: user.name,
        role: user.role,
      },
    );
  }
}
