import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateFriendshipDTO } from './dto/create-friendship.dto';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationStatus, NotificationType } from 'src/common/enums';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject('NATS_SERVICE') private client: ClientProxy,
    private prisma: PrismaService,
  ) {}

  async createNotification(notificationDto: any) {
    console.log('reaching notifications microservice service');
    const notification = await this.prisma.notification.create({
      data: notificationDto,
    });
    return notification;
  }

  async getNotifications(userId: string) {
    const notifications = await this.prisma.notification.findMany({
      where: { userId: userId },
    });
    return notifications;
  }

  async friendRequestNotification(createFriendshipDTO: CreateFriendshipDTO) {
    console.log(createFriendshipDTO.notifyTo, 'to who notify');
    return await this.prisma.notification
      .create({
        data: {
          message: `New friend request`,
          status: NotificationStatus.UNREAD,
          type: NotificationType.FRIEND_REQUEST,
          userId: createFriendshipDTO.addresseeId,
        },
      })
      .then(() => {
        return { userId: createFriendshipDTO.notifyTo };
      });
  }
}
