import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateStatusDto } from './dto/update-status.dto';
import { tap } from 'rxjs';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class StatusService {
  constructor(
    @Inject('NATS_SERVICE') private client: ClientProxy,
    private eventsGateway: EventsGateway,
  ) {}

  async createStatus(userId: string, content: string) {
    console.log('api gateway service status');
    return this.client.send({ cmd: 'create_status' }, { userId, content }).pipe(
      tap((data) => {
        this.eventsGateway.notifyUsers(data, 'status', 'STATUS_CHANGE');
      }),
    );
  }

  async updateStatus(statusId: string, { content, userId }: UpdateStatusDto) {
    return this.client
      .send({ cmd: 'update_status' }, { statusId, content, userId })
      .pipe(
        tap((data) => {
          this.eventsGateway.notifyUsers(data, 'status', 'STATUS_CHANGE');
        }),
      );
  }
}
