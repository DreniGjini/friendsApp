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

export interface ExtendedFriendship {
  id: string;
  requesterId: string;
  addresseeId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  requester?: any;
  addressee?: any;
}

@Injectable()
export class FriendsService {
  constructor(
    @Inject('NATS_SERVICE') private client: ClientProxy,
    private prisma: PrismaService,
  ) {}

  async createFriendship(createFriendDto: CreateFriendDto) {
    try {
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
        {
          ...friendship,
          notifyTo: friendship.addresseeId,
          friendshipId: friendship.id,
          message: 'REQUEST',
        },
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
        {
          ...updatedFriendship,
          notifyTo: updatedFriendship.requesterId,
          firendshipId: updatedFriendship.id,
          message: 'ACCEPTED',
        },
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

  async getFriendshipsByUserId(userId: string): Promise<ExtendedFriendship[]> {
    try {
      const friendships: ExtendedFriendship[] =
        await this.prisma.friend.findMany({
          where: {
            OR: [
              { requesterId: userId, status: FriendRequestStatus.ACCEPTED },
              { addresseeId: userId, status: FriendRequestStatus.ACCEPTED },
            ],
          },
        });

      const detailedFriendships: ExtendedFriendship[] = await Promise.all(
        friendships.map(async (friendship) => {
          const result: ExtendedFriendship = { ...friendship };
          if (friendship.requesterId !== userId) {
            result.requester = await this.prisma.user.findUnique({
              where: { id: friendship.requesterId },
            });
          }
          if (friendship.addresseeId !== userId) {
            result.addressee = await this.prisma.user.findUnique({
              where: { id: friendship.addresseeId },
            });
          }
          return result;
        }),
      );

      return detailedFriendships;
    } catch (error) {
      throw new BadRequestException(
        'Error retrieving friendships',
        error.message,
      );
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
