import { IUser } from '../../interfaces/IUser';

export interface IUserSchema {
  name: string;
  email: string;
  username: string;
  imgUrl: string;
}

export interface IFetchedUser extends IUser {}
