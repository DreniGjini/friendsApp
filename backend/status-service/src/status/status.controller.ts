import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller()
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @MessagePattern({ cmd: 'create_status' })
  create(@Payload() createStatusDto: CreateStatusDto) {
    console.log('status controller status');
    return this.statusService.create(createStatusDto);
  }

  @MessagePattern('update_status')
  update(@Payload() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(updateStatusDto.id, updateStatusDto);
  }
}
