import { BellIcon, CheckIcon } from '@heroicons/react/24/outline';
import Dropdown from '../../shared/dropDown';
import UserItemList from './UserItemList';
import Button from '../../shared/button';
import { useEffect, useState } from 'react';
import { INotification } from '../../../interfaces/INotification';
import useGetUserNotifications from '../../../hooks/useGetUserNotifications/useGetUserNotifications';
import { NotificationStatus, NotificationType } from '../../../common/enums';
import { useAppSelector } from '../../../redux/hooks';
import useMarkNotificationAsRead from '../../../hooks/useMarkAsReadNotification/useUpdateFriendshipStatus';
import { io } from 'socket.io-client';
import sendNotification from '../../../utils/sendNotification';

const Notifications = () => {
  const { getUserNotifications, notificationsData } = useGetUserNotifications();
  const { markNotificationAsRead, notificationData } =
    useMarkNotificationAsRead();
  const { id, token } = useAppSelector((state) => state.authReducer);
  const socket = io(`${process.env.REACT_APP_BASE_URL}?token=${token}`);

  useEffect(() => {
    socket.on('connect', () => {
      socket.on('status', (data: string | any) => {
        if (data === 'STATUS_CHANGE') {
          getUserNotifications({ id });
        }
      });
    });

    return () => {
      socket.off('connect');
    };
  }, [id]);

  useEffect(() => {
    getUserNotifications({
      id,
    });
  }, [notificationData, getUserNotifications, id]);

  const ifNotifications = Boolean(
    notificationsData.filter(
      (el) =>
        el.type === NotificationType.STATUS_UPDATE && NotificationStatus.UNREAD,
    ).length,
  );
  return (
    <div>
      <Dropdown
        initiator={
          <span className="relative">
            {ifNotifications && (
              <span className="w-2 h-2 rounded-full animate-bounce bg-[red] absolute top-0 right-0" />
            )}
            <BellIcon className="w-6 h-6" />
          </span>
        }
      >
        <ul className="text-sm">
          {notificationsData
            .filter(
              (notification) =>
                notification.type === NotificationType.STATUS_UPDATE,
            )
            .map((el: INotification) => (
              <UserItemList
                clickEvent={() => markNotificationAsRead({ id: el.id })}
                key={el.id}
                name={'New Notification!'}
                img={
                  'https://cdn.pixabay.com/photo/2015/12/16/17/41/bell-1096279_1280.png'
                }
                description={
                  el.message === 'Status update!'
                    ? 'One of your friends updated his/her status'
                    : ''
                }
                opened={el.status === NotificationStatus.READ}
              >
                <div>
                  {el.status ? (
                    <CheckIcon className="w-6 h-6" />
                  ) : (
                    <Button
                      dark
                      onClick={() =>
                        markNotificationAsRead({
                          id: el.id,
                        })
                      }
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              </UserItemList>
            ))}
        </ul>
      </Dropdown>
    </div>
  );
};

export default Notifications;
