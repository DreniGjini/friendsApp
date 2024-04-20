import { FriendRequestStatus } from 'src/common/enums';

export class UpdateFriendshipDto {
  status: FriendRequestStatus;

  notificationId: string;
}
