import { Controller, Patch, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards';
import { Roles } from '@common/decorators/roles.decorator';
import { UserRole } from '@common/enums';
import {
  UserSuccessResponseDto,
  UserErrorResponseDto,
  UserResponseDto,
} from '@common/dtos';
import { UpdateUserStatusDto } from '../dto/version1/update-user-status.dto';
import { AdminServiceVersion1 } from '../services/admin.service1';

@ApiTags('Admin Management V1')
@ApiBearerAuth()
@Controller({
  path: 'admin',
  version: '1',
})
export class AdminControllerVersion1 {
  constructor(private readonly adminService: AdminServiceVersion1) {}

  @Patch('update-status')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update User Status (Ban/Unban) (Admin Only)' })
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
}
