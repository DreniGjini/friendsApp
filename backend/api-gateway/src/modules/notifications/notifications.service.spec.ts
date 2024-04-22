import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { ClientProxy } from '@nestjs/microservices';
import { EventsGateway } from '../../events/events.gateway';
import { of, throwError } from 'rxjs';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let clientMock: Partial<ClientProxy>;
  let eventsGatewayMock: Partial<EventsGateway>;

  beforeEach(async () => {
    clientMock = {
      send: jest.fn((pattern, data) => {
        switch (pattern.cmd) {
          case 'create_notification':
            return of({ notificationId: '123', ...data });
          case 'get_notifications':
            return of(['notification1', 'notification2']);
          case 'mark_notification_as_read':
            return of({ id: data, status: 'updated' });
          case 'update_status_notifications':
            return of({ ids: data.ids, status: 'status updated' });
          default:
            return throwError(() => new Error('Command not recognized'));
        }
      }),
    } as any;

    eventsGatewayMock = {
      notifyUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: 'NATS_SERVICE', useValue: clientMock },
        { provide: EventsGateway, useValue: eventsGatewayMock },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getNotifications', () => {
    it('should send a command to get notifications by user ID', async () => {
      const userId = 'user1';
      const expected = ['notification1', 'notification2'];
      (await service.getNotifications(userId)).subscribe({
        next: (result) => {
          expect(result).toEqual(expected);
          expect(clientMock.send).toHaveBeenCalledWith(
            { cmd: 'get_notifications' },
            userId,
          );
        },
        error: () => {
          throw new Error('Should not reach here');
        },
      });
    });
  });
});
