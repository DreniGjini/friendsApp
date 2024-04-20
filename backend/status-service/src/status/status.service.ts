import { Inject, Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { PrismaService } from 'nestjs-prisma';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class StatusService {
  constructor(
    private prisma: PrismaService,
    @Inject('NATS_SERVICE') private client: ClientProxy,
  ) {}

  async create({ content, userId }: CreateStatusDto) {
    console.log('service status');
    return await this.prisma.status
      .create({
        data: {
          content,
          userId,
        },
      })
      .then((data) => {
        return this.client.send({ cmd: 'status_update' }, data);
      });
  }

  async update(id: string, { content }: UpdateStatusDto) {
    console.log('service status');
    return await this.prisma.status
      .update({
        where: { id },
        data: { content },
      })
      .then((data) => {
        this.client.send({ cmd: 'status_update' }, data);
      });
  }
}
