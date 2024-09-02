import { Injectable } from '@nestjs/common';
import { UserRepository } from '@common/DAL/users/repositories/user.repository';
import {
  UserResponseDto,
  UserSuccessResponseDto,
  UserErrorResponseDto,
} from '@common/dtos';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class UserServiceVersion1 {
  constructor(private readonly userRepository: UserRepository) {}

  async getProfile(
    userId: string,
  ): Promise<UserSuccessResponseDto<UserResponseDto> | UserErrorResponseDto> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return new UserErrorResponseDto(HttpStatus.NOT_FOUND, 'User not found');
    }

    return new UserSuccessResponseDto(
      HttpStatus.OK,
      'User profile retrieved successfully',
      new UserResponseDto(user),
    );
  }
}
