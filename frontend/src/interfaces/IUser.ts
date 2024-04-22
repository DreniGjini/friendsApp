import { IFriend } from './IFriend';
import { INotification } from './INotification';
import { IStatus } from './IStatus';

export interface IUser {
  id: string;
  name: string;
  imgUrl?: string;
  username: string;
  email: string;
  statuses: IStatus[];
  createdAt: Date;
  updatedAt: Date;
  sentRequests?: IFriend;
  recievedRequests?: IFriend;
  notifications?: INotification;
}
