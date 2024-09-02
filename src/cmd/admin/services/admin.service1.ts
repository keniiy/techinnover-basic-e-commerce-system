import { Injectable } from '@nestjs/common';
import { UserRepository } from '@common/DAL/users/repositories/user.repository';
import {
  UserSuccessResponseDto,
  UserErrorResponseDto,
  UserResponseDto,
} from '@common/dtos';
import { HttpStatus } from '@nestjs/common';
import { UserStatus } from '@common/enums';
import { UpdateUserStatusDto } from '../dto/version1/update-user-status.dto';

@Injectable()
export class AdminServiceVersion1 {
  constructor(private readonly userRepository: UserRepository) {}

  async updateUserStatus(
    updateUserStatusDto: UpdateUserStatusDto,
  ): Promise<UserSuccessResponseDto<UserResponseDto> | UserErrorResponseDto> {
    const user = await this.userRepository.findById(updateUserStatusDto.userId);

    if (!user) {
      return new UserErrorResponseDto(HttpStatus.NOT_FOUND, 'User not found');
    }

    user.status = updateUserStatusDto.status;
    const updatedUser = await this.userRepository.findOneAndUpdate(
      { _id: user._id },
      user,
    );

    const action =
      updateUserStatusDto.status === UserStatus.BANNED ? 'banned' : 'unbanned';

    return new UserSuccessResponseDto(
      HttpStatus.OK,
      `User ${action} successfully`,
      new UserResponseDto(updatedUser),
    );
  }
}