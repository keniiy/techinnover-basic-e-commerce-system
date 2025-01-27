import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  private readonly logger: Logger;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.logger = new Logger(TokenService.name);
  }

  /**
   * @description Generates a JWT token for the given user ID with the specified time-to-live (TTL).
   * @param {string | number} userId - The ID of the user for whom the token is generated.
   * @param {string} userType - The type of user for whom the token is generated.
   * @param {string} ttl - The time-to-live (TTL) for the generated token.
   * @return {Promise<string>} A promise that resolves to the generated JWT token.
   */
  async generateToken(
    userId: string | number,
    userType: string,
    ttl: string,
  ): Promise<string> {
    try {
      return await this.jwtService.signAsync(
        {
          userId,
          userType,
        },
        {
          expiresIn: ttl,
          secret: this.configService.getOrThrow('JWT_SECRET'),
        },
      );
    } catch (err) {
      this.logger.error('Error generating token', err.stack);
      throw new InternalServerErrorException('Could not generate token');
    }
  }

  /**
   * @description Asynchronously creates and returns an object containing an access token and a refresh token.
   * @param {string | number} userId - The ID of the user for whom the tokens are being created.
   * @param {string} userType - The type of user for whom the tokens are being created.
   * @return {Promise<{ accessToken: string; refreshToken: string }>} - A promise that resolves to an object containing the access token and refresh token.
   * @throws {InternalServerErrorException} - If there is an error creating the tokens.
   */
  async handleCreateTokens(
    userId: string | number,
    userType: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const accessToken = await this.generateToken(
        userId,
        userType,
        this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN', '3600s'),
      );
      const refreshToken = await this.generateToken(
        userId,
        userType,
        this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN', '7d'),
      );
      return { accessToken, refreshToken };
    } catch (err) {
      this.logger.error('Error creating tokens', err.stack);
      throw new InternalServerErrorException('Could not create tokens');
    }
  }

  /**
   * @description Verifies a JWT token to check its validity.
   * @param {string} token - The JWT token to verify.
   * @return {Promise<any>} - The decoded token if valid, otherwise throws an error.
   */
  async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow('JWT_SECRET'),
      });
    } catch (err) {
      this.logger.error('Error verifying token', err.stack);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
