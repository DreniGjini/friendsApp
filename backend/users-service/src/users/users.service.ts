import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { getUserDto } from './dto/getUsersDto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: any) {
    this.logger.log('Attempting to create a user');
    try {
      const user = await this.prisma.user.create({
        data: createUserDto,
        include: {
          notifications: true,
          receivedRequests: true,
          sentRequests: true,
          statuses: true,
        },
      });
      this.logger.log('User creation successful');
      return user;
    } catch (error) {
      this.logger.error('Failed to create user', error.stack);
      throw new BadRequestException('Error creating user');
    }
  }

  async getUsers(data: getUserDto) {
    this.logger.log('Attempting to fetch users');
    try {
      const users = await this.prisma.user.findMany({
        where: {
          NOT: [
            {
              sentRequests: {
                some: {
                  addresseeId: data.userId,
                },
              },
            },
            {
              receivedRequests: {
                some: {
                  requesterId: data.userId,
                },
              },
            },
          ],
        },
        include: {
          sentRequests: true,
          receivedRequests: true,
          statuses: true,
        },
      });
      this.logger.log('Users fetched successfully');
      return users;
    } catch (error) {
      this.logger.error('Failed to fetch users', error.stack);
      throw new BadRequestException('Error fetching users');
    }
  }

  async getUserById(id: string) {
    this.logger.log(`Fetching user by ID: ${id}`);
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          notifications: true,
          receivedRequests: true,
          sentRequests: true,
          statuses: true,
        },
      });
      if (!user) {
        this.logger.warn(`No user found for ID: ${id}`);
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error(`Failed to fetch user by ID: ${id}`, error.stack);
      throw new BadRequestException('Error fetching user');
    }
  }

  async getUserByEmailOrUsername(data: string) {
    this.logger.log(`Searching user by email or username: ${data}`);
    try {
      const user = await this.prisma.user.findFirst({
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
      if (!user) {
        this.logger.warn(`No user found for email/username: ${data}`);
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error(
        `Failed to find user by email or username: ${data}`,
        error.stack,
      );
      throw new BadRequestException('Error finding user');
    }
  }
}
