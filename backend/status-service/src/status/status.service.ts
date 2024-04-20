import {
  Inject,
  Injectable,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { PrismaService } from 'nestjs-prisma';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class StatusService {
  private readonly logger = new Logger(StatusService.name);

  constructor(
    private prisma: PrismaService,
    @Inject('NATS_SERVICE') private client: ClientProxy,
  ) {}

  async create({ content, userId }: CreateStatusDto) {
    this.logger.log(`Creating status for user ${userId}`);
    try {
      const data = await this.prisma.status.create({
        data: {
          content,
          userId,
        },
      });
      return this.client.send({ cmd: 'status_update' }, data);
    } catch (error) {
      this.logger.error(
        `Failed to create status for user ${userId}`,
        error.stack,
      );
      throw new BadRequestException('Error creating status');
    }
  }

  async update(id: string, { content }: UpdateStatusDto) {
    this.logger.log(`Updating status ${id}`);
    try {
      const data = await this.prisma.status.update({
        where: { id },
        data: { content },
      });
      this.client.send({ cmd: 'status_update' }, data);
      return data;
    } catch (error) {
      this.logger.error(`Failed to update status ${id}`, error.stack);
      if (error.code === 'P2025') {
        throw new BadRequestException('No such status exists to update');
      }
      throw new BadRequestException('Error updating status');
    }
  }
}
