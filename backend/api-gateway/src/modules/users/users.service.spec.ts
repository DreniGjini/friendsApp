import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let clientProxyMock: ClientProxy;

  beforeEach(async () => {
    // Create a mock for ClientProxy
    clientProxyMock = {
      connect: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'NATS_SERVICE',
          useValue: clientProxyMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should send a createUser message and return the response', async () => {
      const createUserDto: CreateUserDto = {
        username: 'JohnDoe',
        email: 'john@example.com',
      };

      const expectedResponse = {
        id: '1',
        ...createUserDto,
      };

      (clientProxyMock.send as jest.Mock).mockReturnValue(expectedResponse);

      const result = await service.createUser(createUserDto);
      expect(clientProxyMock.send).toHaveBeenCalledWith(
        { cmd: 'create_user' },
        createUserDto,
      );
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('getUserById', () => {
    it('should send a getUserById message and return the user data', async () => {
      const userId = '1';
      const expectedResponse = {
        id: userId,
        username: 'JohnDoe',
        email: 'john@example.com',
      };

      (clientProxyMock.send as jest.Mock).mockReturnValue(expectedResponse);

      const result = await service.getUserById(userId);
      expect(clientProxyMock.send).toHaveBeenCalledWith(
        { cmd: 'get_user_by_id' },
        userId,
      );
      expect(result).toEqual(expectedResponse);
    });
  });
});
