import { Controller, Logger, BadRequestException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller()
export class StatusController {
  private readonly logger = new Logger(StatusController.name);

  constructor(private readonly statusService: StatusService) {}

  @MessagePattern({ cmd: 'create_status' })
  async create(@Payload() createStatusDto: CreateStatusDto) {
    this.logger.log('Received request to create status');
    try {
      const result = await this.statusService.create(createStatusDto);
      this.logger.log('Status creation successful');
      return result;
    } catch (error) {
      this.logger.error('Failed to create status', error.stack);
      throw new BadRequestException('Error creating status');
    }
  }

  @MessagePattern('update_status')
  async update(@Payload() updateStatusDto: UpdateStatusDto) {
    this.logger.log(`Received request to update status ${updateStatusDto.id}`);
    try {
      const result = await this.statusService.update(
        updateStatusDto.id,
        updateStatusDto,
      );
      this.logger.log(`Status update successful for id ${updateStatusDto.id}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Failed to update status ${updateStatusDto.id}`,
        error.stack,
      );
      throw new BadRequestException('Error updating status');
    }
  }
}
