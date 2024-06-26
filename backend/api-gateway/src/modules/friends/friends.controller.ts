import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post()
  async createFriend(@Body() createFriendDto: CreateFriendDto) {
    try {
      const friend = await this.friendsService.createFriend(createFriendDto);
      return friend;
    } catch (error) {
      throw new BadRequestException('Failed to create friend');
    }
  }

  @Get(':userId')
  async getFriendsByUser(@Param('userId') userId: string) {
    try {
      const friends = await this.friendsService.getFriendsByUserId(userId);
      return friends;
    } catch (error) {
      throw new NotFoundException('Failed to get friends');
    }
  }

  @Patch(':id')
  async updateFriendStatus(
    @Param('id') id: string,
    @Body() updateFriendStatusDto: UpdateFriendDto,
  ) {
    try {
      const updatedFriend = await this.friendsService.updateFriendStatus(
        id,
        updateFriendStatusDto,
      );
      return updatedFriend;
    } catch (error) {
      throw new HttpException(
        'Failed to update friend status',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async deleteFriend(@Param('id') id: string) {
    try {
      await this.friendsService.deleteFriend(id);
      return { message: 'Friend deleted successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to delete friend',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
