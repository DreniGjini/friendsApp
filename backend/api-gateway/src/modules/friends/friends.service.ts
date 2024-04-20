import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { ClientProxy } from '@nestjs/microservices';
import { EventsGateway } from 'src/events/events.gateway';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { catchError, tap, throwError } from 'rxjs';

@Injectable()
export class FriendsService {
  private readonly logger = new Logger(FriendsService.name);

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
        this.logger.log(`Friend request created: User ID ${data.userId}`);
      }),
      catchError((err) => {
        this.logger.error('Error in creating friend request', err);
        return throwError(
          () => new BadRequestException('Error in creating friend request'),
        );
      }),
    );
  }

  async getFriendsByUserId(userId: string) {
    return this.cliProxy.send({ cmd: 'get_friends_by_user' }, userId).pipe(
      tap(() => this.logger.log(`Retrieved friends for User ID ${userId}`)),
      catchError((err) => {
        this.logger.error(
          `Error retrieving friends for User ID ${userId}`,
          err,
        );
        return throwError(
          () => new BadRequestException('Error retrieving friends'),
        );
      }),
    );
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
          this.logger.log(`Friend status updated: User ID ${data.userId}`);
        }),
        catchError((err) => {
          this.logger.error('Error in updating friend status', err);
          return throwError(
            () => new BadRequestException('Error in updating friend status'),
          );
        }),
      );
  }

  async deleteFriend(id: string) {
    return this.cliProxy.send({ cmd: 'delete_friend' }, id).pipe(
      tap(() => this.logger.log(`Deleted friend ID ${id}`)),
      catchError((err) => {
        this.logger.error(`Error deleting friend ID ${id}`, err);
        return throwError(
          () => new BadRequestException('Error deleting friend'),
        );
      }),
    );
  }
}
