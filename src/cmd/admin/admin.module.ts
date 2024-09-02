import { UserSchema, UserRepository } from '@common/DAL';
import { Collections } from '@common/enums';
import { JwtPassportStrategy } from '@common/strategies';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminControllerVersion1 } from './controllers';
import { AdminServiceVersion1 } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Collections.USERS, schema: UserSchema },
    ]),
  ],
  controllers: [AdminControllerVersion1],
  providers: [AdminServiceVersion1, UserRepository, JwtPassportStrategy],
})
export class AdminModule {}
