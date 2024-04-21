import { IUser } from '../../interfaces/IUser';

export type IUserQuery = {
  emailOrUsername: string;
};

export interface IFetchedUser extends IUser {}
