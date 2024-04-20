import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { of } from 'rxjs';

describe('FriendsController', () => {
  let controller: FriendsController;
  let service: FriendsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendsController],
      providers: [
        {
          provide: FriendsService,
          useValue: {
            createFriend: jest.fn(),
            getFriendsByUserId: jest.fn(),
            updateFriendStatus: jest.fn(),
            deleteFriend: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FriendsController>(FriendsController);
    service = module.get<FriendsService>(FriendsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createFriend', () => {
    it('should successfully create a friend', async () => {
      const dto = new CreateFriendDto();
      jest.spyOn(service, 'createFriend').mockResolvedValue(of('a friend'));
      expect(await controller.createFriend(dto)).toBe('a friend');
    });

    it('should throw an exception when service fails', async () => {
      const dto = new CreateFriendDto();
      jest.spyOn(service, 'createFriend').mockRejectedValue(new Error());
      await expect(controller.createFriend(dto)).rejects.toThrow(
        new HttpException('Failed to create friend', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('getFriendsByUser', () => {
    it('should return an array of friends', async () => {
      jest
        .spyOn(service, 'getFriendsByUserId')
        .mockResolvedValue(of(['friend']));
      expect(await controller.getFriendsByUser('user-id')).toEqual(['friend']);
    });

    it('should throw an exception when service fails', async () => {
      jest.spyOn(service, 'getFriendsByUserId').mockRejectedValue(new Error());
      await expect(controller.getFriendsByUser('user-id')).rejects.toThrow(
        new HttpException('Failed to get friends', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('updateFriendStatus', () => {
    it('should return updated friend', async () => {
      const dto = new UpdateFriendDto();
      jest
        .spyOn(service, 'updateFriendStatus')
        .mockResolvedValue(of('updated friend'));
      expect(await controller.updateFriendStatus('id', dto)).toBe(
        'updated friend',
      );
    });

    it('should throw an exception when service fails', async () => {
      const dto = new UpdateFriendDto();
      jest.spyOn(service, 'updateFriendStatus').mockRejectedValue(new Error());
      await expect(controller.updateFriendStatus('id', dto)).rejects.toThrow(
        new HttpException(
          'Failed to update friend status',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('deleteFriend', () => {
    it('should return success message on deletion', async () => {
      jest.spyOn(service, 'deleteFriend').mockResolvedValue(undefined);
      expect(await controller.deleteFriend('id')).toEqual({
        message: 'Friend deleted successfully',
      });
    });

    it('should throw an exception when service fails', async () => {
      jest.spyOn(service, 'deleteFriend').mockRejectedValue(new Error());
      await expect(controller.deleteFriend('id')).rejects.toThrow(
        new HttpException('Failed to delete friend', HttpStatus.BAD_REQUEST),
      );
    });
  });
});
