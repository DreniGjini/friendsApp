import { Module } from '@nestjs/common';
import { AppConfigModule } from './config';
import { NatsModule } from './nats-client/nats.module';

@Module({
  imports: [AppConfigModule, NatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
