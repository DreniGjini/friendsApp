import { FriendRequestStatus } from 'src/common/enums';

export class CreateFriendshipDTO {
  id: string;
  requesterId: string;
  addresseeId: string;
  status: FriendRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  notifyTo: string;
}
