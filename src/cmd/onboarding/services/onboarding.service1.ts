import {
  Injectable,
  ConflictException,
  HttpStatus,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/version1';
import { UserRepository } from '@common/DAL/users/repositories/user.repository';
import { hashPassword } from '@common/utils/password.util';
import { UserRole, UserStatus } from '@common/enums';
import { ConfigService } from '@nestjs/config';
import {
  UserResponseDto,
  UserSuccessResponseDto,
  UserErrorResponseDto,
} from '@common/dtos';
import { ResponseMessages } from '@common/constants';
import { EmailAvailabilityResponseDto } from '@common/dtos/version1/email-availability-response.dto';

@Injectable()
export class OnboardingServiceVersion1 implements OnModuleInit {
  private readonly logger = new Logger(OnboardingServiceVersion1.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.createSuperAdmin();
  }

  async register(
    createUserDto: CreateUserDto,
    role: UserRole,
  ): Promise<UserSuccessResponseDto<UserResponseDto> | UserErrorResponseDto> {
    console.log(createUserDto);

    const userExists = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (userExists)
      throw new ConflictException(
        ResponseMessages.ALREADY_EXISTS(userExists.role),
      );

    const hashedPassword = await hashPassword(createUserDto.password);

    const newUser = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role,
      status: UserStatus.ACTIVE,
    });

    return new UserSuccessResponseDto(
      HttpStatus.CREATED,
      `${newUser.role} created successfully`,
      new UserResponseDto(newUser),
    );
  }

  async checkEmailAvailability(
    email: string,
  ): Promise<
    UserSuccessResponseDto<EmailAvailabilityResponseDto> | UserErrorResponseDto
  > {
    const userExists = await this.userRepository.findOne({ email });
    const isAvailable = !userExists;

    return new UserSuccessResponseDto(
      HttpStatus.OK,
      'Email availability check successful',
      new EmailAvailabilityResponseDto(isAvailable),
    );
  }

  private async createSuperAdmin() {
    const superAdminExists = await this.userRepository.findOne({
      role: UserRole.SUPER_ADMIN,
    });

    if (!superAdminExists) {
      const superAdminEmail =
        this.configService.get<string>('SUPER_ADMIN_EMAIL') ||
        'superadmin@example.com';
      const superAdminPassword =
        this.configService.get<string>('SUPER_ADMIN_PASSWORD') || 'password123';

      const hashedPassword = await hashPassword(superAdminPassword);

      await this.userRepository.create({
        name: 'Super Admin',
        email: superAdminEmail,
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
        status: UserStatus.ACTIVE,
      });

      this.logger.log(`SuperAdmin created with email: ${superAdminEmail}`);
    }
  }
}
