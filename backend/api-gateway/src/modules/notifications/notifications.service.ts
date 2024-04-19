import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventsGateway } from '../../events/events.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject('NATS_SERVICE') private client: ClientProxy,
    private eventsGateway: EventsGateway,
  ) {}

  async createNotification(notificationDto: any) {
    const notification = this.client.send(
      { cmd: 'create_notification' },
      notificationDto,
    );
    this.eventsGateway.notifyUser('userId123', 'newFriendRequest', {
      message: 'You have a new friend request!',
    });
    return notification;
  }

  async getNotifications(userId: string) {
    const notifications = this.client.send(
      { cmd: 'get_notifications' },
      userId,
    );
    return notifications;
  }
}
