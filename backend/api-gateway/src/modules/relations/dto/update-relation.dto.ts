import { PartialType } from '@nestjs/mapped-types';
import { CreateRelationDto } from './create-relation.dto';
import { FriendRequestStatus } from 'src/common/enums';

export class UpdateRelationDto extends PartialType(CreateRelationDto) {
  status: FriendRequestStatus;
}
