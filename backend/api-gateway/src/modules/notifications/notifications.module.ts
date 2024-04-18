import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NatsModule } from 'src/nats-client/nats.module';
import { EventsGateway } from 'src/events/events.gateway';

@Module({
  imports: [NatsModule, EventsGateway],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
