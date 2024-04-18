import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@Inject('NATS_SERVICE') private cliProxy: ClientProxy) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    return this.cliProxy.send({ cmd: 'create_user' }, createUserDto);
  }
  async getUserById(id: string): Promise<any> {
    return this.cliProxy.send({ cmd: 'get_user_by_id' }, id);
  }
}
