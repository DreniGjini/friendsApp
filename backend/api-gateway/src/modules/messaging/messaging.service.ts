import { Inject, Injectable } from '@nestjs/common';
import { EventsGateway } from 'src/events/events.gateway';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MessagingService {
  constructor(
    @Inject('NATS_SERVICE') private cliProxy: ClientProxy,
    private eventsGateway: EventsGateway,
  ) {}

  async handleFriendRequestCreated(addresseeId: string) {
    this.eventsGateway.notifyUser(addresseeId, 'friends', {
      message: 'FRIEND_REQUEST',
    });
  }

  async handleFriendRequestStatusUpdated(userId: string) {
    this.eventsGateway.notifyUser(userId, 'friends', {
      message: 'FRIEND_ACCEPTED',
    });
  }
}
