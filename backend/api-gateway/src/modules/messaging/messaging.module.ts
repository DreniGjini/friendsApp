import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { MessagingController } from './messaging.controller';
import { EventsModule } from 'src/events/events.module';
import { NatsModule } from 'src/nats-client/nats.module';

@Module({
  imports: [NatsModule, EventsModule],
  controllers: [MessagingController],
  providers: [MessagingService],
})
export class MessagingModule {}
