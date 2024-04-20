import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersMicroserviceController } from './users.controller';
import { NatsModule } from 'src/nats-client/nats.module';
import { PrismaService } from 'nestjs-prisma';

@Module({
  imports: [NatsModule],
  controllers: [UsersMicroserviceController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
