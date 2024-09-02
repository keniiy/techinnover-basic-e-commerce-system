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

  /**
   * Retrieves the profile of the user with the given ID.
   *
   * @param userId The ID of the user to retrieve.
   * @returns A promise that resolves to a UserSuccessResponseDto containing the user document, or a UserErrorResponseDto if the user is not found.
   */
  async getProfile(
    userId: string,
  ): Promise<UserSuccessResponseDto<UserResponseDto> | UserErrorResponseDto> {
    const user = await this.userRepository.findById(userId);

    if (!user)
      return new UserErrorResponseDto(HttpStatus.NOT_FOUND, 'User not found');

    return new UserSuccessResponseDto(
      HttpStatus.OK,
      'User profile retrieved successfully',
      new UserResponseDto(user),
    );
  }
}
