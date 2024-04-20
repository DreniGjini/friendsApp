// friends.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from 'nestjs-prisma';
import { CreateFriendDto } from './dto/create-friend.dto';
import { FriendRequestStatus } from 'src/common/enums';
@Injectable()
export class FriendsService {
  constructor(
    @Inject('NATS_SERVICE') private client: ClientProxy,

    private prisma: PrismaService,
  ) {}

  async createFriendship(createFriendDto: CreateFriendDto) {
    console.log('reaching service friend microservice');

    const friendship = await this.prisma.friend.create({
      data: {
        status: FriendRequestStatus.PENDING,
        addresseeId: createFriendDto.addresseeId,
        requesterId: createFriendDto.requesterId,
      },
    });
    if (friendship) {
      return this.client.send(
        { cmd: 'friend_request_pending_or_changed' },
        { ...friendship, notifyTo: friendship.addresseeId },
      );
    }
  }

  async updateFriendshipStatus(
    friendshipId: string,
    status: FriendRequestStatus,
  ) {
    const updatedFriendship = await this.prisma.friend.update({
      where: { id: friendshipId },
      data: { status },
    });
    if (updatedFriendship) {
      return this.client.send(
        { cmd: 'friend_request_pending_or_changed' },
        { ...updatedFriendship, notifyTo: updatedFriendship.requesterId },
      );
    }
  }

  async getFriendshipsByUserId(userId: string) {
    const friendships = await this.prisma.friend.findMany({
      where: { OR: [{ requesterId: userId }, { addresseeId: userId }] },
    });
    return friendships;
  }

  async deleteFriendship(friendshipId: string) {
    const deletedFriendship = await this.prisma.friend.delete({
      where: { id: friendshipId },
    });
    return deletedFriendship;
  }
}
