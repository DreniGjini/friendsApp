import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersMicroserviceController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create_user' })
  async createUser(@Payload() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  async getUserById(@Payload() id: string) {
    return await this.usersService.getUserById(id);
  }

  @MessagePattern({ cmd: 'get_user_by_email_or_username' })
  async getUserByUsernameOrEmail(@Payload() data: string) {
    return await this.usersService.getUserByEmailOrUsername(data);
  }
}
