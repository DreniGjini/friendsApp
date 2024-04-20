import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFriendDto {
  @IsString()
  @IsNotEmpty()
  requesterId: string;

  @IsString()
  @IsNotEmpty()
  addresseeId: string;
}
