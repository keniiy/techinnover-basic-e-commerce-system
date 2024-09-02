import { UserRole, UserStatus } from '@enums/index';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
}
