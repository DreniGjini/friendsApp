import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { ClientProxy } from '@nestjs/microservices';
import { EventsGateway } from 'src/events/events.gateway';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { catchError, tap, throwError } from 'rxjs';

@Injectable()
export class FriendsService {
  constructor(
    @Inject('NATS_SERVICE') private cliProxy: ClientProxy,
    private eventsGateway: EventsGateway,
  ) {}

  async createFriend(createFriendDto: CreateFriendDto) {
    return this.cliProxy.send({ cmd: 'create_friend' }, createFriendDto).pipe(
      tap((data) => {
        this.eventsGateway.notifyUser(
          data.userId,
          'friends',
          'NEW_FRIEND_REQUEST',
        );
      }),
      catchError(() => {
        return throwError(
          () => new BadRequestException('Error in creating friend request'),
        );
      }),
    );
  }

  async getFriendsByUserId(userId: string) {
    return this.cliProxy.send({ cmd: 'get_friends_by_user' }, userId);
  }

  async updateFriendStatus(id: string, updateFriendStatusDto: UpdateFriendDto) {
    return this.cliProxy
      .send({ cmd: 'update_friend_status' }, { id, ...updateFriendStatusDto })
      .pipe(
        tap((data) => {
          this.eventsGateway.notifyUser(
            data.userId,
            'friends',
            'FRIEND_REQUEST_ACCEPTED',
          );
        }),
        catchError(() => {
          return throwError(
            () => new BadRequestException('Error in updating friend status'),
          );
        }),
      );
  }

  async deleteFriend(id: string) {
    return this.cliProxy.send({ cmd: 'delete_friend' }, id);
  }
}
