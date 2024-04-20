import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { StatusService } from './status.service';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  async createStatus(@Body() body: { userId: string; content: string }) {
    console.log('api gateway controller status');
    const { userId, content } = body;
    return await this.statusService.createStatus(userId, content);
  }

  @Patch(':statusId')
  async updateStatus(
    @Param('statusId') statusId: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return await this.statusService.updateStatus(statusId, updateStatusDto);
  }
}
