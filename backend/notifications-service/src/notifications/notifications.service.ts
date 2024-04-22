import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';
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
    try {
      return await this.prisma.notification.create({
        data: notificationDto,
      });
    } catch (err) {
      throw new BadRequestException('Failed to create notification');
    }
  }

  async getNotifications(userId: string) {
    try {
      const notifications = await this.prisma.notification.findMany({
        where: { userId },
      });
      return notifications;
    } catch (err) {
      throw new BadRequestException('Failed to retrieve notifications');
    }
  }

  async markNotificationAsRead(id: string) {
    try {
      const updatedNotification = await this.prisma.notification.update({
        where: { id },
        data: { status: NotificationStatus.READ },
      });
      return updatedNotification.userId;
    } catch (err) {
      throw new BadRequestException('Failed to update notification status');
    }
  }

  async friendRequestNotification(createFriendshipDTO: CreateFriendshipDTO) {
    try {
      await this.prisma.notification.create({
        data: {
          message: createFriendshipDTO.message,
          status: NotificationStatus.UNREAD,
          type: NotificationType.FRIEND_REQUEST,
          userId: createFriendshipDTO.notifyTo,
          friendshipId: createFriendshipDTO.friendshipId,
        },
      });
      return {
        userId: createFriendshipDTO.notifyTo,
        friendshipId: createFriendshipDTO.friendshipId,
      };
    } catch (err) {
      throw new BadRequestException(
        'Failed to create friend request notification',
      );
    }
  }

  async updateUsersStatusNotifications(
    notificationIds: string[],
    userId: string,
  ) {
    try {
      await this.prisma.notification.updateMany({
        where: {
          AND: [
            { id: { in: notificationIds } },
            { userId },
            { type: NotificationType.STATUS_UPDATE },
          ],
        },
        data: { status: NotificationStatus.READ },
      });
      return userId;
    } catch (err) {
      throw new BadRequestException('Failed to update status notifications');
    }
  }

  async fetchUserWithAcceptedFriends(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
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
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (err) {
      throw new BadRequestException(
        'Failed to fetch user with accepted friends',
      );
    }
  }

  async notifyAllFriends(userId: string): Promise<string[]> {
    const userWithFriends = await this.fetchUserWithAcceptedFriends(userId);

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
