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

  @MessagePattern({ cmd: 'friend_request_pending' })
  friendRequestNotification(@Payload() friends: CreateFriendshipDTO) {
    console.log('message revieved in controller');

    return this.notificationsService.friendRequestNotification(friends);
  }
}
