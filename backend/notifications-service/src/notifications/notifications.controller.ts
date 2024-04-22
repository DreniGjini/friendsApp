import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';
import { CreateFriendshipDTO } from './dto/create-friendship.dto';
import { BadRequestException } from '@nestjs/common';

@Controller()
export class NotificationsController {
  private readonly logger = new Logger(NotificationsController.name);

  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern({ cmd: 'create_notification' })
  async createNotification(@Payload() notificationDto: any) {
    try {
      return await this.notificationsService.createNotification(
        notificationDto,
      );
    } catch (error) {
      this.logger.error('Error creating notification', error);
      throw new BadRequestException(
        error?.message || 'Failed to create notification',
      );
    }
  }

  @MessagePattern({ cmd: 'get_notifications' })
  async getNotifications(@Payload() userId: string) {
    try {
      return await this.notificationsService.getNotifications(userId);
    } catch (error) {
      this.logger.error('Error getting notifications', error);
      throw new BadRequestException(
        error?.message || 'Failed to retrieve notifications',
      );
    }
  }

  @MessagePattern({ cmd: 'friend_request_pending_or_changed' })
  async friendRequestNotification(@Payload() friends: CreateFriendshipDTO) {
    try {
      return await this.notificationsService.friendRequestNotification(friends);
    } catch (error) {
      this.logger.error('Error handling friend request notification', error);
      throw new BadRequestException(
        error?.message || 'Failed to handle friend request notification',
      );
    }
  }

  @MessagePattern({ cmd: 'status_update' })
  async statusCreatedNotification(@Payload() { userId }: { userId: string }) {
    try {
      return await this.notificationsService.notifyAllFriends(userId);
    } catch (error) {
      this.logger.error('Error notifying all friends', error);
      throw new BadRequestException(
        error?.message || 'Failed to notify all friends',
      );
    }
  }

  @MessagePattern({ cmd: 'mark_notification_as_read' })
  async markNotificationAsRead(@Payload() id: string) {
    try {
      return await this.notificationsService.markNotificationAsRead(id);
    } catch (error) {
      this.logger.error('Error updating friendship notification', error);
      throw new BadRequestException(
        error?.message || 'Failed to update friendship notification',
      );
    }
  }

  @MessagePattern({ cmd: 'update_status_notifications' })
  async updateUsersStatusNotifications(
    @Payload() { ids, userId }: { ids: string[]; userId: string },
  ) {
    try {
      return await this.notificationsService.updateUsersStatusNotifications(
        ids,
        userId,
      );
    } catch (error) {
      this.logger.error('Error updating status notifications', error);
      throw new BadRequestException(
        error?.message || 'Failed to update status notifications',
      );
    }
  }
}
