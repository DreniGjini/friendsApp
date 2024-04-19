// src/friends/friends.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { FriendRequestStatus } from 'src/common/enums';

describe('FriendsController', () => {
  let controller: FriendsController;
  let service: FriendsService;

  beforeEach(async () => {
    const mockFriendsService = {
      createFriend: jest.fn(),
      getFriendsByUserId: jest.fn(),
      updateFriendStatus: jest.fn(),
      deleteFriend: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendsController],
      providers: [
        {
          provide: FriendsService,
          useValue: mockFriendsService,
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
    it('should call FriendsService.createFriend', async () => {
      const dto = new CreateFriendDto();
      dto.userId = '1';
      dto.relatedUserId = '2';
      (service.createFriend as jest.Mock).mockResolvedValue(dto);
      await controller.createFriend(dto);
      expect(service.createFriend).toHaveBeenCalledWith(dto);
    });
  });

  describe('getFriendsByUser', () => {
    it('should call FriendsService.getFriendsByUserId', async () => {
      const userId = '1';
      const expectedResponse = [];
      (service.getFriendsByUserId as jest.Mock).mockResolvedValue(
        expectedResponse,
      );
      const result = await controller.getFriendsByUser(userId);
      expect(service.getFriendsByUserId).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('updateFriendStatus', () => {
    it('should call FriendsService.updateFriendStatus', async () => {
      const id = '1';
      const dto = new UpdateFriendDto();
      dto.status = FriendRequestStatus.ACCEPTED;
      (service.updateFriendStatus as jest.Mock).mockResolvedValue({
        ...dto,
        id,
      });
      const result = await controller.updateFriendStatus(id, dto);
      expect(service.updateFriendStatus).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual({ ...dto, id });
    });
  });

  describe('deleteFriend', () => {
    it('should call FriendsService.deleteFriend', async () => {
      const id = '1';
      (service.deleteFriend as jest.Mock).mockResolvedValue({
        message: 'Friend deleted successfully',
      });
      const result = await controller.deleteFriend(id);
      expect(service.deleteFriend).toHaveBeenCalledWith(id);
      expect(result).toEqual({ message: 'Friend deleted successfully' });
    });
  });
});
