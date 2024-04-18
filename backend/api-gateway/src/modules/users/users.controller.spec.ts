// src/users/users.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
            getUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const dto = new CreateUserDto();
      dto.username = 'JohnDoe';
      dto.email = 'john@example.com';

      const expectedResponse = {
        id: '1',
        ...dto,
      };

      jest.spyOn(service, 'createUser').mockResolvedValue(expectedResponse);
      expect(await controller.createUser(dto)).toEqual(expectedResponse);
    });

    it('should throw an internal server error if the service throws', async () => {
      const dto = new CreateUserDto();
      dto.username = 'JohnDoe';
      dto.email = 'john@example.com';

      jest
        .spyOn(service, 'createUser')
        .mockRejectedValue(new Error('Some internal error'));

      await expect(controller.createUser(dto)).rejects.toThrow(HttpException);
    });
  });

  describe('getUserById', () => {
    it('should return a user if found', async () => {
      const result = {
        id: '1',
        username: 'JohnDoe',
        email: 'john@example.com',
      };
      jest.spyOn(service, 'getUserById').mockResolvedValue(result);
      expect(await controller.getUserById('1')).toEqual(result);
    });

    it('should throw not found exception if user is not found', async () => {
      jest.spyOn(service, 'getUserById').mockResolvedValue(null);
      await expect(controller.getUserById('1')).rejects.toThrow(
        new HttpException('Failed to get user', HttpStatus.NOT_FOUND),
      );
    });
  });
});
