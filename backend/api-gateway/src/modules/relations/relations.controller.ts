import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RelationsService } from './relations.service';
import { CreateRelationDto } from './dto/create-relation.dto';
import { UpdateRelationDto } from './dto/update-relation.dto';

@Controller('relations')
export class RelationsController {
  constructor(private readonly relationsService: RelationsService) {}

  @Post()
  async createRelation(@Body() createRelationDto: CreateRelationDto) {
    try {
      const relation =
        await this.relationsService.createRelation(createRelationDto);
      return relation;
    } catch (error) {
      throw new HttpException(
        'Failed to create relation',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':userId')
  async getRelationsByUser(@Param('userId') userId: string) {
    try {
      const relations =
        await this.relationsService.getRelationsByUserId(userId);
      return relations;
    } catch (error) {
      throw new HttpException('Failed to get relations', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async updateRelationStatus(
    @Param('id') id: string,
    @Body() updateRelationStatusDto: UpdateRelationDto,
  ) {
    try {
      const updatedRelation = await this.relationsService.updateRelationStatus(
        id,
        updateRelationStatusDto,
      );
      return updatedRelation;
    } catch (error) {
      throw new HttpException(
        'Failed to update relation status',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async deleteRelation(@Param('id') id: string) {
    try {
      await this.relationsService.deleteRelation(id);
      return { message: 'Relation deleted successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to delete relation',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
