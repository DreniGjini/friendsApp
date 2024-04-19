import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagingService } from './messaging.service';

@Controller()
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @MessagePattern({ cmd: 'friend_request_notification_created' })
  handleFriendRequestCreated(@Payload() addresseeId: string) {
    return this.messagingService.handleFriendRequestCreated(addresseeId);
  }

  @MessagePattern('findAllMessaging')
  handleFriendRequestStatusUpdated(@Payload() userId: string) {
    return this.messagingService.handleFriendRequestStatusUpdated(userId);
  }
}
