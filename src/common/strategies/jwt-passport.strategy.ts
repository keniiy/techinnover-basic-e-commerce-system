import { UserRepository } from '@common/DAL';
import { UserRole } from '@common/enums';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtPassportStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger = new Logger(JwtPassportStrategy.name);

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
   * @return {Promise<any>} - A Promise that resolves to the validated user if the user exists, otherwise throws an UnauthorizedException.
   * @throws {UnauthorizedException} - If the user with the payload's userId does not exist.
   */
  async validate(payload: any) {
    this.logger.log(`Validating JWT payload: ${JSON.stringify(payload)}`);

    const user = await this.userRepository.findById(payload.userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
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
