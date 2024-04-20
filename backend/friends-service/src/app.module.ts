import { Module } from '@nestjs/common';
import { FriendsModule } from './friends/friends.module';
import { NatsModule } from './nats-client/nats.module';

@Module({
  imports: [NatsModule, FriendsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
