import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { ClientProxy } from '@nestjs/microservices';
import { EventsGateway } from 'src/events/events.gateway';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { catchError, tap, throwError } from 'rxjs';
import { FriendRequestStatus } from 'src/common/enums';

@Injectable()
export class FriendsService {
  constructor(
    @Inject('NATS_SERVICE') private cliProxy: ClientProxy,
    private eventsGateway: EventsGateway,
  ) {}

  async createFriend(createFriendDto: CreateFriendDto) {
    this.cliProxy.send({ cmd: 'create_friend' }, createFriendDto).pipe(
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
          if (data.status === FriendRequestStatus.ACCEPTED) {
            this.eventsGateway.notifyUser(
              updateFriendStatusDto.userId,
              'friends',
              {
                message: 'ACCEPTED',
              },
            );
          }
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
