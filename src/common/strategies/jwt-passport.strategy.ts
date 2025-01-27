import { UserRepository } from '@common/DAL';
import { UserRole, UserStatus } from '@common/enums';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtPassportStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger = new Logger(JwtPassportStrategy.name);

  /**
   * Creates an instance of JwtPassportStrategy.
   *
   * @param configService The ConfigService used to retrieve the secret key from the configuration.
   * @param userRepository The instance of the UserRepository.
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  /**
   * Validates the payload of a JWT.
   *
   * @param {any} payload - The payload of the JWT to validate.
   * @return {Promise<any>} - A Promise that resolves to the validated user if the user exists, is not banned, and has a valid role.
   * @throws {UnauthorizedException} - If the user does not exist, is banned, or has an invalid role.
   */
  async validate(payload: any) {
    this.logger.log(`Validating JWT payload: ${JSON.stringify(payload)}`);

    const user = await this.userRepository.findById(payload.userId);

    if (!user) throw new UnauthorizedException('Unauthorized');

    if (user.status === UserStatus.BANNED) {
      throw new UnauthorizedException('User is banned, please contact support');
    }

    if (
      payload.userType !== UserRole.ADMIN &&
      payload.userType !== UserRole.USER &&
      payload.userType !== UserRole.SUPER_ADMIN
    ) {
      throw new UnauthorizedException('Unauthorized');
    }

    return user;
  }
}
