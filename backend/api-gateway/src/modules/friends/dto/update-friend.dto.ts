import { PartialType } from '@nestjs/mapped-types';
import { CreateFriendDto } from './create-friend.dto';
import { FriendRequestStatus } from 'src/common/enums';

export class UpdateFriendDto extends PartialType(CreateFriendDto) {
  status: FriendRequestStatus;
}
