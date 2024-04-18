// src/relations/relations.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { RelationsController } from './relations.controller';
import { RelationsService } from './relations.service';
import { CreateRelationDto } from './dto/create-relation.dto';
import { UpdateRelationDto } from './dto/update-relation.dto';
import { FriendRequestStatus } from 'src/common/enums';

describe('RelationsController', () => {
  let controller: RelationsController;
  let service: RelationsService;

  beforeEach(async () => {
    const mockRelationsService = {
      createRelation: jest.fn(),
      getRelationsByUserId: jest.fn(),
      updateRelationStatus: jest.fn(),
      deleteRelation: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelationsController],
      providers: [
        {
          provide: RelationsService,
          useValue: mockRelationsService,
        },
      ],
    }).compile();

    controller = module.get<RelationsController>(RelationsController);
    service = module.get<RelationsService>(RelationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createRelation', () => {
    it('should call RelationsService.createRelation', async () => {
      const dto = new CreateRelationDto();
      dto.userId = '1';
      dto.relatedUserId = '2';
      (service.createRelation as jest.Mock).mockResolvedValue(dto);
      await controller.createRelation(dto);
      expect(service.createRelation).toHaveBeenCalledWith(dto);
    });
  });

  describe('getRelationsByUser', () => {
    it('should call RelationsService.getRelationsByUserId', async () => {
      const userId = '1';
      const expectedResponse = [];
      (service.getRelationsByUserId as jest.Mock).mockResolvedValue(
        expectedResponse,
      );
      const result = await controller.getRelationsByUser(userId);
      expect(service.getRelationsByUserId).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('updateRelationStatus', () => {
    it('should call RelationsService.updateRelationStatus', async () => {
      const id = '1';
      const dto = new UpdateRelationDto();
      dto.status = FriendRequestStatus.ACCEPTED;
      (service.updateRelationStatus as jest.Mock).mockResolvedValue({
        ...dto,
        id,
      });
      const result = await controller.updateRelationStatus(id, dto);
      expect(service.updateRelationStatus).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual({ ...dto, id });
    });
  });

  describe('deleteRelation', () => {
    it('should call RelationsService.deleteRelation', async () => {
      const id = '1';
      (service.deleteRelation as jest.Mock).mockResolvedValue({
        message: 'Relation deleted successfully',
      });
      const result = await controller.deleteRelation(id);
      expect(service.deleteRelation).toHaveBeenCalledWith(id);
      expect(result).toEqual({ message: 'Relation deleted successfully' });
    });
  });
});
