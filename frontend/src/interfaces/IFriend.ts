import { FriendRequestStatus } from '../common/enums';
import { IUser } from './IUser';

export interface IFriend {
  id: string;
  requesterId: string;
  addreseeId: string;
  status: FriendRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requester: IUser;
  addressee: IUser;
}
