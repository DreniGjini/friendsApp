import { Module } from '@nestjs/common';
import { AppConfigModule } from './config';
import { NatsModule } from './nats-client/nats.module';
import { UsersModule } from './modules/users/users.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { StatusModule } from './modules/status/status.module';
import { RelationsModule } from './modules/relations/relations.module';
import { EventsGateway } from './events/events.gateway';

@Module({
  imports: [
    AppConfigModule,
    NatsModule,
    UsersModule,
    RelationsModule,
    StatusModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [EventsGateway],
})
export class AppModule {}
