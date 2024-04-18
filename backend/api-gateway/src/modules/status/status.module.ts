import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { NatsModule } from 'src/nats-client/nats.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [NatsModule, EventsModule],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
