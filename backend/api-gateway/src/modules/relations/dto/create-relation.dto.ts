import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRelationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  relatedUserId: string;
}
