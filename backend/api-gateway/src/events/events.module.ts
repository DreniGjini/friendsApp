import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { NatsModule } from 'src/nats-client/nats.module';

@Module({
  imports: [NatsModule],
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
