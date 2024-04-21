import { IFriend } from './IFriend';
import { INotification } from './INotification';
import { IStatus } from './IStatus';

export interface IUser {
  id: string;
  name: string;
  imgUrl?: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  status?: IStatus;
  sentRequests?: IFriend;
  recievedRequests?: IFriend;
  notifications?: INotification;
}
