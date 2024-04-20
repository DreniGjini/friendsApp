import { Module } from '@nestjs/common';
import { StatusModule } from './status/status.module';
import { NatsModule } from './nats-client/nats.module';

@Module({
  imports: [StatusModule, NatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
