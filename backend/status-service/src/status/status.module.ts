import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { PrismaService } from 'nestjs-prisma';
import { NatsModule } from 'src/nats-client/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [StatusController],
  providers: [StatusService, PrismaService],
})
export class StatusModule {}
