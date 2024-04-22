import { FriendRequestStatus } from '../../common/enums';

export interface IUpdateFriendshipSchema {
  status: FriendRequestStatus;
}

export interface IUpdatedFriendshipRequest {
  userId: string;
}
