import { Controller, Logger, BadRequestException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { getUserDto } from './dto/getUsersDto';

@Controller()
export class UsersMicroserviceController {
  private readonly logger = new Logger(UsersMicroserviceController.name);

  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create_user' })
  async createUser(@Payload() createUserDto: CreateUserDto) {
    this.logger.log('Received command to create user');
    try {
      const result = await this.usersService.createUser(createUserDto);
      this.logger.log('User creation successful');
      return result;
    } catch (error) {
      this.logger.error('Failed to create user', error.stack);
      throw new BadRequestException('Error creating user');
    }
  }

  @MessagePattern({ cmd: 'get_users' })
  async getUsers(@Payload() data: getUserDto) {
    this.logger.log('Received command to get users');
    try {
      const result = await this.usersService.getUsers(data);
      this.logger.log('Users fetched successful');
      return result;
    } catch (error) {
      this.logger.error('Failed to fetch users', error.stack);
      throw new BadRequestException('Error fetching users');
    }
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  async getUserById(@Payload() id: string) {
    this.logger.log(`Received command to get user by ID: ${id}`);
    try {
      const user = await this.usersService.getUserById(id);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error(`Failed to get user by ID: ${id}`, error.stack);
      throw new BadRequestException('Error retrieving user');
    }
  }

  @MessagePattern({ cmd: 'get_user_by_email_or_username' })
  async getUserByUsernameOrEmail(@Payload() data: string) {
    this.logger.log(
      `Received command to get user by email or username: ${data}`,
    );
    try {
      const user = await this.usersService.getUserByEmailOrUsername(data);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error(
        `Failed to get user by email or username: ${data}`,
        error.stack,
      );
      throw new BadRequestException('Error retrieving user');
    }
  }
}
