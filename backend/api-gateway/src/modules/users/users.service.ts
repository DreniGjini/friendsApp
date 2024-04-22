import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { map, catchError, throwError } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(@Inject('NATS_SERVICE') private cliProxy: ClientProxy) {}
  private readonly JWT_SECRET = 'verysecret';

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    return this.cliProxy.send({ cmd: 'create_user' }, createUserDto).pipe(
      map((data) => {
        const payload = { username: data.username, userId: data.id };
        return {
          userData: data,
          token: jwt.sign(payload, this.JWT_SECRET, { expiresIn: '10h' }),
        };
      }),
      catchError((err) => {
        console.error('Error creating user:', err);
        return throwError(
          () => new BadRequestException('Failed to create user'),
        );
      }),
    );
  }

  async getUsers(userId: string): Promise<any> {
    return this.cliProxy.send({ cmd: 'get_users' }, userId).pipe(
      catchError((err) => {
        console.error('Error getting users:', err);
        return throwError(() => new BadRequestException('Failed to get users'));
      }),
    );
  }

  async getUserById(id: string): Promise<any> {
    return this.cliProxy.send({ cmd: 'get_user_by_id' }, id).pipe(
      catchError((err) => {
        console.error('Error retrieving user:', err);
        return throwError(() => new BadRequestException('User not found'));
      }),
    );
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
        catchError((err) => {
          console.error('Error during login:', err);
          return throwError(() => new BadRequestException('Login failed'));
        }),
      );
  }
}
