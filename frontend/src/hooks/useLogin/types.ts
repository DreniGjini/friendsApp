import { IUser } from '../../interfaces/IUser';

export type IUserQuery = {
  emailOrUsername: string;
};

export interface IFetchedUser {
  userData: IUser;
  token: string;
}
