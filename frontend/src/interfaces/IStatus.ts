import { IUser } from './IUser';

export interface IStatus {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}
