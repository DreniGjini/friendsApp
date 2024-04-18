import { Module } from '@nestjs/common';
import { RelationsService } from './relations.service';
import { RelationsController } from './relations.controller';
import { NatsModule } from 'src/nats-client/nats.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [NatsModule, EventsModule],
  controllers: [RelationsController],
  providers: [RelationsService],
})
export class RelationsModule {}
