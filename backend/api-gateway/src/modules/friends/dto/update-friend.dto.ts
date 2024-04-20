import { IsNotEmpty, IsString } from 'class-validator';
import { FriendRequestStatus } from 'src/common/enums';

export class UpdateFriendDto {
  @IsString()
  @IsNotEmpty()
  status: FriendRequestStatus;
}
