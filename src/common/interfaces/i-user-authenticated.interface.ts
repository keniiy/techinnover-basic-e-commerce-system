import { UserModel } from '@common/DAL';

export interface IUserAuthenticated extends UserModel {
  id: string;
}
