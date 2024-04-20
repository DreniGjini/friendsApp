// friends.service.ts
import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from 'nestjs-prisma';
import { CreateFriendDto } from './dto/create-friend.dto';
import { FriendRequestStatus } from 'src/common/enums';
import { Prisma } from '@prisma/client';

@Injectable()
export class FriendsService {
  constructor(
    @Inject('NATS_SERVICE') private client: ClientProxy,
    private prisma: PrismaService,
  ) {}

  async createFriendship(createFriendDto: CreateFriendDto) {
    try {
      console.log('reaching service friend microservice');
      const friendship = await this.prisma.friend.create({
        data: {
          status: FriendRequestStatus.PENDING,
          addresseeId: createFriendDto.addresseeId,
          requesterId: createFriendDto.requesterId,
        },
      });
      if (!friendship)
        throw new BadRequestException('Failed to create friendship');
      return this.client.send(
        { cmd: 'friend_request_pending_or_changed' },
        { ...friendship, notifyTo: friendship.addresseeId },
      );
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error creating friendship',
      );
    }
  }

  async updateFriendshipStatus(
    friendshipId: string,
    status: FriendRequestStatus,
  ) {
    try {
      const updatedFriendship = await this.prisma.friend.update({
        where: { id: friendshipId },
        data: { status },
      });
      if (!updatedFriendship)
        throw new BadRequestException('Failed to update friendship');
      return this.client.send(
        { cmd: 'friend_request_pending_or_changed' },
        { ...updatedFriendship, notifyTo: updatedFriendship.requesterId },
      );
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Friendship not found');
      }
      throw new BadRequestException(
        error.message || 'Error updating friendship',
      );
    }
  }

  async getFriendshipsByUserId(userId: string) {
    try {
      const friendships = await this.prisma.friend.findMany({
        where: { OR: [{ requesterId: userId }, { addresseeId: userId }] },
      });
      if (!friendships) throw new NotFoundException('Friendships not found');
      return friendships;
    } catch (error) {
      throw new BadRequestException('Error retrieving friendships');
    }
  }

  async deleteFriendship(friendshipId: string) {
    try {
      const deletedFriendship = await this.prisma.friend.delete({
        where: { id: friendshipId },
      });
      if (!deletedFriendship)
        throw new NotFoundException('Friendship not found');
      return deletedFriendship;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Friendship not found');
      }
      throw new BadRequestException('Error deleting friendship');
    }
  }
}
