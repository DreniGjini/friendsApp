import { Inject, Injectable } from '@nestjs/common';
import { CreateRelationDto } from './dto/create-relation.dto';

import { ClientProxy } from '@nestjs/microservices';
import { EventsGateway } from 'src/events/events.gateway';
import { UpdateRelationDto } from './dto/update-relation.dto';

@Injectable()
export class RelationsService {
  constructor(
    @Inject('NATS_SERVICE') private cliProxy: ClientProxy,
    private eventsGateway: EventsGateway, // Inject the EventsGateway
  ) {}

  async createRelation(createRelationDto: CreateRelationDto) {
    const result = this.cliProxy.send(
      { cmd: 'create_relation' },
      createRelationDto,
    );
    this.eventsGateway.notifyRoom(
      createRelationDto.userId,
      'relationCreated',
      result,
    );
    return result;
  }

  async getRelationsByUserId(userId: string) {
    return this.cliProxy.send({ cmd: 'get_relations_by_user' }, userId);
  }

  async updateRelationStatus(
    id: string,
    updateRelationStatusDto: UpdateRelationDto,
  ) {
    const result = this.cliProxy.send(
      { cmd: 'update_relation_status' },
      { id, ...updateRelationStatusDto },
    );
    this.eventsGateway.notifyRoom(
      updateRelationStatusDto.userId,
      'relationStatusUpdated',
      result,
    );
    return result;
  }

  async deleteRelation(id: string) {
    const result = this.cliProxy.send({ cmd: 'delete_relation' }, id);
    this.eventsGateway.notifyRoom(id, 'relationDeleted', {
      message: 'Relation deleted successfully',
    });
    return result;
  }
}
