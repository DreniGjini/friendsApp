import { Module } from '@nestjs/common';
import { NatsModule } from './nats-client/nats.module';
import { AppConfigModule } from './config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [NatsModule, AppConfigModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
