// src/status/status.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';

describe('StatusController', () => {
  let controller: StatusController;
  let service: StatusService;

  beforeEach(async () => {
    const mockStatusService = {
      createStatus: jest.fn(),
      getStatusesByUserId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [
        {
          provide: StatusService,
          useValue: mockStatusService,
        },
      ],
    }).compile();

    controller = module.get<StatusController>(StatusController);
    service = module.get<StatusService>(StatusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createStatus', () => {
    it('should call StatusService.createStatus', async () => {
      const dto = new CreateStatusDto();
      dto.userId = '1';
      dto.content = 'Hello World';
      (service.createStatus as jest.Mock).mockResolvedValue(dto);
      await controller.createStatus(dto);
      expect(service.createStatus).toHaveBeenCalledWith(dto);
    });
  });

  describe('getStatusesByUserId', () => {
    it('should call StatusService.getStatusesByUserId', async () => {
      const userId = '1';
      (service.getStatusesByUserId as jest.Mock).mockResolvedValue([]);
      const result = await controller.getStatusesByUserId(userId);
      expect(service.getStatusesByUserId).toHaveBeenCalledWith(userId);
      expect(result).toEqual([]);
    });
  });
});
