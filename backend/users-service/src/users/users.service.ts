import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: any) {
    return await this.prisma.user.create({
      data: createUserDto,
      include: {
        notifications: true,
        receivedRequests: true,
        sentRequests: true,
        statuses: true,
      },
    });
  }

  async getUserById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        notifications: true,
        receivedRequests: true,
        sentRequests: true,
        statuses: true,
      },
    });
  }

  async getUserByEmailOrUsername(data: string) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ username: data }, { email: data }],
      },
      include: {
        notifications: true,
        receivedRequests: true,
        sentRequests: true,
        statuses: true,
      },
    });
  }
}
