import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Query,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { OnboardingServiceVersion1 } from '../services/onboarding.service1';
import { UserRole } from '@common/enums';
import { CreateUserDto } from '../dto/version1/create-user.dto';
import {
  UserErrorResponseDto,
  UserSuccessResponseDto,
  UserResponseDto,
} from '@common/dtos';
import {
  EmailAvailabilityResponseDto,
  EmailFalseAvailabilityResponseDto,
} from '@common/dtos/version1/email-availability-response.dto';
import { Roles } from '@common/decorators';
import { JwtAuthGuard } from '@common/guards';
import { RolesGuard } from '@common/guards/roles.guard';

@ApiTags('Onboarding V1')
@ApiBearerAuth()
@Controller({
  path: 'onboarding',
  version: '1',
})
export class OnboardingControllerVersion1 {
  /**
   * The constructor for the OnboardingControllerVersion1 class.
   * @param onboardingServiceVersion1 The OnboardingServiceVersion1 instance to be used for the controller.
   */
  constructor(
    private readonly onboardingServiceVersion1: OnboardingServiceVersion1,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: CreateUserDto,
    description: 'The user details for registration',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User registered successfully',
    type: UserSuccessResponseDto<UserResponseDto>,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with this email already exists',
    type: UserErrorResponseDto,
  })
  /**
   * Registers a new user.
   * @param createUserDto The user details for registration.
   * @returns A promise that resolves to a UserSuccessResponseDto containing the newly created user document if the registration was successful, or a UserErrorResponseDto if the registration failed.
   */
  async register(@Body() createUserDto: CreateUserDto) {
    return this.onboardingServiceVersion1.register(
      createUserDto,
      UserRole.USER,
    );
  }

  @Post('create-admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a new admin (SuperAdmin only)' })
  @ApiBody({ type: CreateUserDto, description: 'The admin details' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Admin created successfully',
    type: UserSuccessResponseDto<UserResponseDto>,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Only SuperAdmin can create an Admin',
    type: UserErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Admin with this email already exists',
    type: UserErrorResponseDto,
  })
  @Roles(UserRole.SUPER_ADMIN)
  /**
   * Creates a new admin user (SuperAdmin only).
   * @param createAdminDto The admin details for registration.
   * @returns A promise that resolves to a UserSuccessResponseDto containing the newly created user document if the registration was successful, or a UserErrorResponseDto if the registration failed.
   */
  async createAdmin(@Body() createAdminDto: CreateUserDto) {
    return this.onboardingServiceVersion1.register(
      createAdminDto,
      UserRole.ADMIN,
    );
  }

  @Get('check-email')
  @ApiOperation({ summary: 'Check if an email is already taken' })
  @ApiQuery({ name: 'email', description: 'The email to check' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Email availability check successful',
    type: UserSuccessResponseDto<EmailAvailabilityResponseDto>,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid email format',
    type: UserSuccessResponseDto<EmailFalseAvailabilityResponseDto>,
  })
  /**
   * Checks if an email is available or already taken.
   * @param email The email to check.
   * @returns A promise that resolves to a UserSuccessResponseDto containing a boolean indicating if the email is available (true) or not (false).
   */
  async checkEmail(@Query('email') email: string) {
    return this.onboardingServiceVersion1.checkEmailAvailability(email);
  }
}
