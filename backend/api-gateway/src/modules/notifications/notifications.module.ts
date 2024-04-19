import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NatsModule } from 'src/nats-client/nats.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [NatsModule, EventsModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
