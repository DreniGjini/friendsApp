import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  async createStatus(@Body() body: { userId: string; content: string }) {
    const { userId, content } = body;
    try {
      return await this.statusService.createStatus(userId, content);
    } catch (error) {
      throw new HttpException(
        'Failed to create status',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':statusId')
  async updateStatus(
    @Param('statusId') statusId: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    try {
      return await this.statusService.updateStatus(statusId, updateStatusDto);
    } catch (error) {
      throw new HttpException(
        'Failed to update status',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
