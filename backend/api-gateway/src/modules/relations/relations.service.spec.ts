import { Test, TestingModule } from '@nestjs/testing';
import { RelationsService } from './relations.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateRelationDto } from './dto/create-relation.dto';
import { UpdateRelationDto } from './dto/update-relation.dto';

describe('RelationsService', () => {
  let service: RelationsService;
  let clientProxyMock: jest.Mocked<ClientProxy>;

  beforeEach(async () => {
    // Create a mock for ClientProxy
    clientProxyMock = {
      send: jest.fn(),
      connect: jest.fn(),
      close: jest.fn(),
    } as any;

    // Create a mock for EventsGateway

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationsService,
        { provide: 'NATS_SERVICE', useValue: clientProxyMock },
      ],
    }).compile();

    service = module.get<RelationsService>(RelationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createRelation', () => {
    it('should create a relation and notify the room', async () => {
      const dto = new CreateRelationDto(); // Populate with appropriate properties
      const resultValue = 'someValue'; // Expected result from the clientProxy
      clientProxyMock.send.mockResolvedValue(resultValue as never);

      const result = await service.createRelation(dto);

      expect(clientProxyMock.send).toHaveBeenCalledWith(
        { cmd: 'create_relation' },
        dto,
      );

      expect(result).toBe(resultValue);
    });
  });

  describe('getRelationsByUserId', () => {
    it('should return relations for a user', async () => {
      const userId = 'user123';
      const expectedResult = ['relation1', 'relation2'];
      clientProxyMock.send.mockResolvedValue(expectedResult as never);

      const result = await service.getRelationsByUserId(userId);

      expect(clientProxyMock.send).toHaveBeenCalledWith(
        { cmd: 'get_relations_by_user' },
        userId,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('updateRelationStatus', () => {
    it('should update relation status and notify the room', async () => {
      const id = 'rel123';
      const dto = new UpdateRelationDto(); // Populate with appropriate properties
      const resultValue = 'updateSuccess';
      clientProxyMock.send.mockResolvedValue(resultValue as never);

      const result = await service.updateRelationStatus(id, dto);

      expect(clientProxyMock.send).toHaveBeenCalledWith(
        { cmd: 'update_relation_status' },
        { id, ...dto },
      );

      expect(result).toBe(resultValue);
    });
  });

  describe('deleteRelation', () => {
    it('should delete a relation and notify the room', async () => {
      const id = 'rel123';
      const resultValue = 'deleteSuccess';
      clientProxyMock.send.mockResolvedValue(resultValue as never);

      const result = await service.deleteRelation(id);

      expect(clientProxyMock.send).toHaveBeenCalledWith(
        { cmd: 'delete_relation' },
        id,
      );

      expect(result).toBe(resultValue);
    });
  });
});
