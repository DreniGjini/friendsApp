import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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

  async updateFriendshipNotification(id: string) {
    try {
      const updatedNotification = await this.prisma.notification.update({
        where: { id },
        data: {
          status: NotificationStatus.READ,
        },
      });
      return updatedNotification.userId;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async friendRequestNotification(createFriendshipDTO: CreateFriendshipDTO) {
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
        return {
          userId: createFriendshipDTO.notifyTo,
          friendsId: createFriendshipDTO.id,
        };
      });
  }

  async updateUsersStatusNotifications(
    notificationIds: string[],
    userId: string,
  ) {
    try {
      await this.prisma.notification.updateMany({
        where: {
          AND: [
            {
              id: {
                in: notificationIds,
              },
            },
            {
              userId: userId,
            },
            {
              type: NotificationType.STATUS_UPDATE,
            },
          ],
        },
        data: {
          status: 'READ',
        },
      });
      return userId;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async fetchUserWithAcceptedFriends(userId: string) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        sentRequests: {
          where: { status: 'ACCEPTED' },
          include: { addressee: true },
        },
        receivedRequests: {
          where: { status: 'ACCEPTED' },
          include: { requester: true },
        },
      },
    });
  }

  async notifyAllFriends(userId: string): Promise<string[]> {
    const userWithFriends = await this.fetchUserWithAcceptedFriends(userId);

    if (!userWithFriends) {
      throw new Error('User not found');
    }

    const friendIds = new Set([
      ...userWithFriends.sentRequests.map((request) => request.addressee.id),
      ...userWithFriends.receivedRequests.map(
        (request) => request.requester.id,
      ),
    ]);

    const notificationsPromises = Array.from(friendIds).map((friendId) =>
      this.prisma.notification.create({
        data: {
          message: `Status update!`,
          status: 'UNREAD',
          type: 'STATUS_UPDATE',
          userId: friendId,
        },
      }),
    );

    await Promise.all(notificationsPromises);

    return Array.from(friendIds);
  }
}
