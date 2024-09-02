import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Collections } from '@common/enums';
import { UserSchema, UserRepository } from '@common/DAL';
import { UserControllerVersion1 } from './controllers/user.controller';
import { UserServiceVersion1 } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Collections.USERS, schema: UserSchema },
    ]),
  ],
  controllers: [UserControllerVersion1],
  providers: [UserServiceVersion1, UserRepository],
})
export class UserModule {}
