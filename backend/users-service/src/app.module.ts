import { Module } from '@nestjs/common';
import { NatsModule } from './nats-client/nats.module';
import { AppConfigModule } from './config';

@Module({
  imports: [NatsModule, AppConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
