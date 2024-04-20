import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { firstValueFrom, of } from 'rxjs';

describe('NotificationsController', () => {
  let controller: NotificationsController;
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        {
          provide: NotificationsService,
          useValue: {
            createNotification: jest.fn(),
            getNotifications: jest.fn(),
            updateFriendShipStatusNotification: jest.fn(),
            updateUsersStatusNotifications: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createNotification', () => {
    it('should create a notification and return it', async () => {
      const dto = { message: 'Hello' };
      jest
        .spyOn(service, 'createNotification')
        .mockReturnValue(Promise.resolve(of(dto)));

      const result = await firstValueFrom(
        await controller.createNotification(dto),
      );
      expect(result).toBe(dto);
    });

    it('should handle errors when creating a notification', async () => {
      const dto = { message: 'Error' };
      jest.spyOn(service, 'createNotification').mockRejectedValue(new Error());
      await expect(controller.createNotification(dto)).rejects.toThrow(
        new HttpException(
          'Failed to create notification',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('getNotifications', () => {});

  describe('updateFriendshipNotification', () => {
    it('should retrieve notifications', async () => {
      const userId = 'user1';
      const notifications = ['notif1', 'notif2'];
      jest
        .spyOn(service, 'getNotifications')
        .mockResolvedValue(of(notifications));

      const result = await firstValueFrom(
        await controller.getNotifications(userId),
      );
      expect(result).toEqual(notifications);
    });
  });

  describe('updateUsersStatusNotifications', () => {
    it('should call updateUsersStatusNotifications', async () => {
      const userId = 'user3';
      const ids = ['notif1', 'notif2'];
      const spy = jest
        .spyOn(service, 'updateUsersStatusNotifications')
        .mockImplementation();
      await controller.updateUsersStatusNotifications(userId, ids);
      expect(spy).toHaveBeenCalledWith(ids, userId);
    });
  });
});
