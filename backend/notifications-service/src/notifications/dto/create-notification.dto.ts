import { NotificationStatus, NotificationType } from 'src/common/enums';

export class CreateNotificationDto {
  userId: string;
  type: NotificationType;
  message: string;
  status: NotificationStatus;
}
