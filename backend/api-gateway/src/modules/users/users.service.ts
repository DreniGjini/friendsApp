import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UsersService {
  constructor(@Inject('NATS_SERVICE') private cliProxy: ClientProxy) {}
  private readonly JWT_SECRET = 'verysecret';

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    return this.cliProxy.send({ cmd: 'create_user' }, createUserDto);
  }
  async getUserById(id: string): Promise<any> {
    return this.cliProxy.send({ cmd: 'get_user_by_id' }, id);
  }

  async login(id: string): Promise<any> {
    return this.cliProxy
      .send({ cmd: 'get_user_by_email_or_username' }, id)
      .pipe(
        map((data) => {
          const payload = { username: data.username, userId: data.id };
          return {
            userData: data,
            token: jwt.sign(payload, this.JWT_SECRET, { expiresIn: '10h' }),
          };
        }),
      );
  }
}
