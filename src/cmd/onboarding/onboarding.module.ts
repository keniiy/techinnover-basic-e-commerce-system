import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { OnboardingControllerVersion1 } from './controllers';
import { OnboardingServiceVersion1 } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { Collections } from '@common/enums';
import { UserRepository, UserSchema } from '@common/DAL';
import { JwtStrategy } from '@common/strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Collections.USERS,
        schema: UserSchema,
      },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      /**
       * A factory function that is responsible for creating the options for the
       * JwtModule. It receives the ConfigService as an argument and returns an
       * object with the secret and signOptions.
       *
       * The secret is retrieved from the configuration using the key 'JWT_SECRET'.
       * The signOptions is an object that contains the expiresIn option set to 1 hour.
       * @param configService The ConfigService used to retrieve the secret from the configuration.
       * @returns An object with the secret and signOptions.
       */
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [OnboardingControllerVersion1],
  providers: [OnboardingServiceVersion1, UserRepository, JwtStrategy],
})
export class OnboardingModule {}
