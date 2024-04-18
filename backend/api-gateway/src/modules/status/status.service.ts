import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventsGateway } from '../../events/events.gateway';

@Injectable()
export class StatusService {
  constructor(
    @Inject('NATS_SERVICE') private client: ClientProxy,
    private eventsGateway: EventsGateway,
  ) {}

  async createStatus(userId: string, content: string) {
    const status = await this.client
      .send({ cmd: 'create_status' }, { userId, content })
      .toPromise();
    this.eventsGateway.notifyRoom(userId, 'statusUpdated', status);
    return status;
  }

  async updateStatus(userId: string, statusId: string, newContent: string) {
    const updatedStatus = await this.client
      .send({ cmd: 'update_status' }, { statusId, newContent })
      .toPromise();
    this.eventsGateway.notifyRoom(userId, 'statusUpdated', updatedStatus);
    return updatedStatus;
  }
}
