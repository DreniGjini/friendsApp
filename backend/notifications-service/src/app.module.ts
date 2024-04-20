import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications.module';
import { NatsModule } from './nats-client/nats.module';

@Module({
  imports: [NotificationsModule, NatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
