import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventsGateway } from '../../events/events.gateway';
import { catchError, tap, throwError } from 'rxjs';

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

    return notification;
  }

  async getNotifications(userId: string) {
    const notifications = this.client.send(
      { cmd: 'get_notifications' },
      userId,
    );
    return notifications;
  }

  async updateFriendShipStatusNotification(id: string) {
    return this.client.send({ cmd: 'update_friendship_notification' }, id).pipe(
      tap((data) => {
        this.eventsGateway.notifyUser(
          data,
          'friends',
          'NEW_FRIEND_REQUEST_UPDATE',
        );
      }),
      catchError(() => {
        return throwError(
          () => new BadRequestException('Error in updating status request'),
        );
      }),
    );
  }

  async updateUsersStatusNotifications(ids: string[], userId: string) {
    return this.client
      .send({ cmd: 'update_status_notifications' }, { ids, userId })
      .pipe(
        tap((data) => {
          this.eventsGateway.notifyUser(data, 'friends', 'STATUS_CHANGE');
        }),
        catchError(() => {
          return throwError(
            () => new BadRequestException('Error in updating status request'),
          );
        }),
      );
  }
}
