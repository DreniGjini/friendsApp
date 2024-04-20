import { Test, TestingModule } from '@nestjs/testing';
import { FriendsService } from './friends.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';

describe('FriendsService', () => {
  let service: FriendsService;
  let clientProxyMock: jest.Mocked<ClientProxy>;

  beforeEach(async () => {
    clientProxyMock = {
      send: jest.fn(),
      connect: jest.fn(),
      close: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FriendsService,
        { provide: 'NATS_SERVICE', useValue: clientProxyMock },
      ],
    }).compile();

    service = module.get<FriendsService>(FriendsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createFriend', () => {
    it('should create a Friend and notify the room', async () => {
      const dto = new CreateFriendDto(); // Populate with appropriate properties
      const resultValue = 'someValue'; // Expected result from the clientProxy
      clientProxyMock.send.mockResolvedValue(resultValue as never);

      const result = await service.createFriend(dto);

      expect(clientProxyMock.send).toHaveBeenCalledWith(
        { cmd: 'create_friend' },
        dto,
      );

      expect(result).toBe(resultValue);
    });
  });

  describe('getFriendsByUserId', () => {
    it('should return friends for a user', async () => {
      const userId = 'user123';
      const expectedResult = ['friend1', 'friend2'];
      clientProxyMock.send.mockResolvedValue(expectedResult as never);

      const result = await service.getFriendsByUserId(userId);

      expect(clientProxyMock.send).toHaveBeenCalledWith(
        { cmd: 'get_friends_by_user' },
        userId,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('updateFriendStatus', () => {
    it('should update friend status and notify the room', async () => {
      const id = 'rel123';
      const dto = new UpdateFriendDto(); // Populate with appropriate properties
      const resultValue = 'updateSuccess';
      clientProxyMock.send.mockResolvedValue(resultValue as never);

      const result = await service.updateFriendStatus(id, dto);

      expect(clientProxyMock.send).toHaveBeenCalledWith(
        { cmd: 'update_friend_status' },
        { id, ...dto },
      );

      expect(result).toBe(resultValue);
    });
  });

  describe('deleteFriend', () => {
    it('should delete a friend and notify the room', async () => {
      const id = 'rel123';
      const resultValue = 'deleteSuccess';
      clientProxyMock.send.mockResolvedValue(resultValue as never);

      const result = await service.deleteFriend(id);

      expect(clientProxyMock.send).toHaveBeenCalledWith(
        { cmd: 'delete_friend' },
        id,
      );

      expect(result).toBe(resultValue);
    });
  });
});
