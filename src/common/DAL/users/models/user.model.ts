import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { IUser } from '@interfaces/index';
import { UserRole, UserStatus, Collections } from '@enums/index';

@Schema({ collection: Collections.USERS, timestamps: true })
export class UserModel implements IUser {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ required: true, enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;
}

export type UserDocument = UserModel &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };
export const UserSchema = SchemaFactory.createForClass(UserModel);
UserSchema.plugin(mongoosePaginate);
