import { Module } from '@nestjs/common';
import { AuthControllerVersion1 } from './controllers';
import { AuthServiceVersion1 } from './services';
import { UserRepository, UserSchema } from '@common/DAL';
import { Collections } from '@common/enums';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtPassportStrategy } from '@common/strategies';
import { TokenService } from '@common/integrations';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: Collections.USERS,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AuthControllerVersion1],
  providers: [
    AuthServiceVersion1,
    JwtPassportStrategy,
    UserRepository,
    TokenService,
  ],
})
export class AuthModule {}
