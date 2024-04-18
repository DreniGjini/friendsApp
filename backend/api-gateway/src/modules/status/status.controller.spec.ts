// src/status/status.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { StatusService } from './status.service';
import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';

describe('StatusService', () => {
  let service: StatusService;
  let clientProxyMock: ClientProxy;

  beforeEach(async () => {
    clientProxyMock = {
      send: jest
        .fn()
        .mockImplementation((pattern, data) => of({ pattern, data })),
      connect: jest.fn(),
      close: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatusService,
        {
          provide: 'NATS_SERVICE',
          useValue: clientProxyMock,
        },
      ],
    }).compile();

    service = module.get<StatusService>(StatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createStatus', () => {
    it('should send a message to create a status', async () => {
      const dto = { userId: '1', content: 'Hello World' };
      await service.createStatus(dto);
      expect(clientProxyMock.send).toHaveBeenCalledWith(
        { cmd: 'create_status' },
        dto,
      );
    });
  });

  describe('getStatusesByUserId', () => {
    it('should send a message to get statuses by user ID', async () => {
      const userId = '1';
      await service.getStatusesByUserId(userId);
      expect(clientProxyMock.send).toHaveBeenCalledWith(
        { cmd: 'get_statuses_by_user' },
        userId,
      );
    });
  });
});
