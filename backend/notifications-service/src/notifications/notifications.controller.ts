import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';
import { CreateFriendshipDTO } from './dto/create-friendship.dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern({ cmd: 'create_notification' })
  createNotification(@Payload() notificationDto: any) {
    return this.notificationsService.createNotification(notificationDto);
  }

  @MessagePattern({ cmd: 'get_notifications' })
  getNotifications(@Payload() userId: string) {
    return this.notificationsService.getNotifications(userId);
  }

  @MessagePattern({ cmd: 'friend_request_pending_or_changed' })
  friendRequestNotification(@Payload() friends: CreateFriendshipDTO) {
    return this.notificationsService.friendRequestNotification(friends);
  }

  @MessagePattern({ cmd: 'status_update' })
  statusCreatedNotification(@Payload() { userId }: { userId: string }) {
    return this.notificationsService.notifyAllFriends(userId);
  }

  @MessagePattern({ cmd: 'update_friendship_notification' })
  updateFriendshipNotification(@Payload() id: string) {
    return this.notificationsService.updateFriendshipNotification(id);
  }

  @MessagePattern({ cmd: 'update_status_notifications' })
  updateUsersStatusNotifications(
    @Payload() { ids, userId }: { ids: string[]; userId: string },
  ) {
    return this.notificationsService.updateUsersStatusNotifications(
      ids,
      userId,
    );
  }
}
