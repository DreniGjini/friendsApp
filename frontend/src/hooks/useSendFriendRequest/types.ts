export interface ISendRequestSchema {
  requesterId: string;
  addresseeId: string;
}

export interface IFetchedFriendRequest  {
  userId: string,
  friendsId: string
}
