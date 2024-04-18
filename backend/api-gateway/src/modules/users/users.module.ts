import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { NatsModule } from 'src/nats-client/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
