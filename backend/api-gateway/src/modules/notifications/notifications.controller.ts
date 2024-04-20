import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async createNotification(@Body() notificationDto: any) {
    try {
      const notification =
        await this.notificationsService.createNotification(notificationDto);
      return notification;
    } catch (error) {
      throw new HttpException(
        'Failed to create notification',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':userId')
  async getNotifications(@Param('userId') userId: string) {
    try {
      const notifications =
        await this.notificationsService.getNotifications(userId);
      return notifications;
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve notifications',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  async updateFriendshipNotification(@Param('id') id: string) {
    this.notificationsService.updateFriendShipStatusNotification(id);
  }

  @Patch(':userId')
  async updateUsersStatusNotifications(
    @Param('userId') userId: string,
    @Body() ids: string[],
  ) {
    this.notificationsService.updateUsersStatusNotifications(ids, userId);
  }
}
