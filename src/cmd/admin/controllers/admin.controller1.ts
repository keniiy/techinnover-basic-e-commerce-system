import { Controller, Patch, Body, UseGuards, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards';
import { Roles } from '@common/decorators/roles.decorator';
import { UserRole } from '@common/enums';
import {
  UserSuccessResponseDto,
  UserErrorResponseDto,
  UserResponseDto,
  UserPaginatedResponseDto,
} from '@common/dtos';
import { UpdateUserStatusDto } from '../dto/version1/update-user-status.dto';
import { AdminServiceVersion1 } from '../services/admin.service1';
import { FindUsersDto } from '../dto';
import { RolesGuard } from '@common/guards/roles.guard';

@ApiTags('Admin Management V1')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({
  path: 'admin',
  version: '1',
})
export class AdminControllerVersion1 {
  constructor(private readonly adminService: AdminServiceVersion1) {}

  @Patch('update-status')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update User Status (Ban/Un-ban) (Admin Only)' })
  @ApiBody({ type: UpdateUserStatusDto })
  @ApiResponse({
    status: 200,
    description: 'User status updated successfully',
    type: UserSuccessResponseDto<UserResponseDto>,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: UserErrorResponseDto,
  })
  async updateUserStatus(@Body() updateUserStatusDto: UpdateUserStatusDto) {
    return this.adminService.updateUserStatus(updateUserStatusDto);
  }

  @Get('users')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get list of all users (Admin Only)' })
  @ApiQuery({ type: FindUsersDto })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully',
    type: UserSuccessResponseDto<UserPaginatedResponseDto>,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request',
    type: UserErrorResponseDto,
  })
  async getAllUsers(@Query() findUsersDto: FindUsersDto) {
    return this.adminService.getAllUsers(findUsersDto);
  }
}
