import { Module } from '@nestjs/common';
import { AppConfigModule } from './config';
import { NatsModule } from './nats-client/nats.module';
import { UsersModule } from './modules/users/users.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { StatusModule } from './modules/status/status.module';
import { FriendsModule } from './modules/friends/friends.module';
import { EventsGateway } from './events/events.gateway';
import { EventsModule } from './events/events.module';
import { MessagingModule } from './modules/messaging/messaging.module';

@Module({
  imports: [
    AppConfigModule,
    NatsModule,
    UsersModule,
    FriendsModule,
    StatusModule,
    NotificationsModule,
    EventsModule,
    MessagingModule,
  ],
  controllers: [],
  providers: [EventsGateway],
})
export class AppModule {}
