import { NotificationStatus, NotificationType } from '../common/enums';
import { IUser } from './IUser';

export interface INotification {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  status: NotificationStatus;
  createdAd: Date;
  user: IUser;
  friendshipId: string;
}
