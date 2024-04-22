import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { FriendsService } from './friends.service';
import { FriendRequestStatus } from 'src/common/enums';

@Controller()
export class FriendsController {
  private readonly logger = new Logger(FriendsController.name);

  constructor(private readonly friendsService: FriendsService) {}

  @EventPattern({ cmd: 'create_friend' })
  async createFriendship(@Payload() createFriendDto: any) {
    try {
      return await this.friendsService.createFriendship(createFriendDto);
    } catch (error) {
      this.logger.error('Error creating friendship', error.stack);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'update_friend_status' })
  async updateFriendshipStatus(
    @Payload() data: { id: string; status: FriendRequestStatus },
  ) {
    try {
      return await this.friendsService.updateFriendshipStatus(
        data.id,
        data.status,
      );
    } catch (error) {
      this.logger.error('Error updating friendship status', error.stack);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get_friends_by_user' })
  async getFriendshipsByUserId(@Payload() userId: string) {
    try {
      return await this.friendsService.getFriendshipsByUserId(userId);
    } catch (error) {
      this.logger.error('Error getting friendships', error.stack);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'delete_friend' })
  async deleteFriendship(@Payload() friendshipId: string) {
    try {
      return await this.friendsService.deleteFriendship(friendshipId);
    } catch (error) {
      this.logger.error('Error deleting friendship', error.stack);
      throw error;
    }
  }
}
