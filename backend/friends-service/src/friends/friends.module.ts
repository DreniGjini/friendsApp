import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { PrismaService } from 'nestjs-prisma';
import { NatsModule } from 'src/nats-client/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [FriendsController],
  providers: [FriendsService, PrismaService],
})
export class FriendsModule {}
