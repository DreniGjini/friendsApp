import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  async createStatus(@Body() body: { userId: string; content: string }) {
    const { userId, content } = body;
    return await this.statusService.createStatus(userId, content);
  }

  @Patch(':statusId')
  async updateStatus(
    @Param('statusId') statusId: string,
    @Body() body: { userId: string; newContent: string },
  ) {
    const { userId, newContent } = body;
    return await this.statusService.updateStatus(userId, statusId, newContent);
  }
}
