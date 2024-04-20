// friends.controller.ts
import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { FriendsService } from './friends.service';
import { FriendRequestStatus } from 'src/common/enums';

@Controller()
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @EventPattern({ cmd: 'create_friend' })
  createFriendship(@Payload() createFriendDto: any) {
    return this.friendsService.createFriendship(createFriendDto);
  }

  @MessagePattern({ cmd: 'update_friend_status' })
  updateFriendshipStatus(
    @Payload() data: { id: string; status: FriendRequestStatus },
  ) {
    console.log('idawdawd', data.id);
    return this.friendsService.updateFriendshipStatus(data.id, data.status);
  }

  @MessagePattern({ cmd: 'get_friends_by_user' })
  getFriendshipsByUserId(@Payload() userId: string) {
    return this.friendsService.getFriendshipsByUserId(userId);
  }

  @MessagePattern({ cmd: 'delete_friend' })
  deleteFriendship(@Payload() friendshipId: string) {
    return this.friendsService.deleteFriendship(friendshipId);
  }
}
