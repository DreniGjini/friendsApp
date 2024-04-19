import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { NatsModule } from 'src/nats-client/nats.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [NatsModule, EventsModule],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
