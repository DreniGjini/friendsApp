import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFriendDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  relatedUserId: string;
}
