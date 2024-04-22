import { CheckIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Dropdown from '../../shared/dropDown';
import Button from '../../shared/button';
import UserItemList from './UserItemList';
import { useEffect } from 'react';
import {
  FriendRequestStatus,
  NotificationStatus,
  NotificationType,
} from '../../../common/enums';
import useGetUserNotifications from '../../../hooks/useGetUserNotifications/useGetUserNotifications';
import { INotification } from '../../../interfaces/INotification';
import { useAppSelector } from '../../../redux/hooks';
import useUpdateFriendshipStatus from '../../../hooks/useUpdateFriendshipStatus/useUpdateFriendshipStatus';
import useMarkNotificationAsRead from '../../../hooks/useMarkAsReadNotification/useUpdateFriendshipStatus';
import { io } from 'socket.io-client';
import sendNotification from '../../../utils/sendNotification';

const Invitations = () => {
  const { id, token } = useAppSelector((state) => state.authReducer);

  const { getUserNotifications, notificationsData } = useGetUserNotifications();
  const { updateFriendRequest, userData } = useUpdateFriendshipStatus();
  const { markNotificationAsRead, notificationData } =
    useMarkNotificationAsRead();

  const socket = io(`${process.env.REACT_APP_BASE_URL}?token=${token}`);

  useEffect(() => {
    socket.on('connect', () => {
      socket.on('friends', (data: string | any) => {
        if (data === 'NEW_FRIEND_REQUEST') {
          sendNotification('Friend Request', 'New friend request waiting!');
          getUserNotifications({
            id,
          });
        }
      });
    });

    return () => {
      socket.off('connect');
    };
  }, [getUserNotifications, id]);

  const ifNotifications = Boolean(
    notificationsData.filter(
      (el) =>
        el.type === NotificationType.FRIEND_REQUEST &&
        el.status === NotificationStatus.UNREAD,
    ).length,
  );

  useEffect(() => {
    getUserNotifications({
      id,
    });
  }, [notificationData, getUserNotifications, id, userData]);

  function updateFriendRequestPromise(
    statusInfo: FriendRequestStatus,
    friendshipId: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      updateFriendRequest({ status: statusInfo }, friendshipId);
      if (userData) {
        resolve();
      }
    });
  }

  const handleFriendRequest = (
    notification: INotification,
    notificationId: string,
    notiStatus: FriendRequestStatus,
  ) => {
    updateFriendRequestPromise(notiStatus, notification.friendshipId).then(
      () => {
        markNotificationAsRead({
          id: notificationId,
        });
      },
    );
  };

  return (
    <div>
      <Dropdown
        initiator={
          <span className="relative">
            {ifNotifications && (
              <span className="w-2 h-2 rounded-full animate-bounce bg-[red] absolute top-0 right-0" />
            )}
            <UserGroupIcon className="w-6 h-6" />
          </span>
        }
      >
        <ul className="text-sm">
          {notificationsData
            .filter((noti) => noti.type === NotificationType.FRIEND_REQUEST)
            .map((el: INotification) => (
              <UserItemList
                key={el.id}
                name={'Friend request update!'}
                img={
                  'https://as2.ftcdn.net/v2/jpg/02/13/07/97/1000_F_213079766_H31GUge7QePKmv0BU5pBUYrcuZqydnHl.jpg'
                }
                description={
                  el.message === 'ACCEPTED'
                    ? 'Your friend request has been accepted!'
                    : ''
                }
                opened={el.status === NotificationStatus.READ}
              >
                <div>
                  {el.status === NotificationStatus.READ ||
                  el.message === 'ACCEPTED' ? (
                    <CheckIcon className="w-6 h-6" />
                  ) : (
                    el.message === 'REQUEST' && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            handleFriendRequest(
                              el,
                              el.id,
                              FriendRequestStatus.REJECTED,
                            )
                          }
                        >
                          Decline
                        </Button>
                        <Button
                          onClick={() =>
                            handleFriendRequest(
                              el,
                              el.id,
                              FriendRequestStatus.ACCEPTED,
                            )
                          }
                          dark
                        >
                          Accept
                        </Button>
                      </div>
                    )
                  )}
                </div>
              </UserItemList>
            ))}
        </ul>
      </Dropdown>
    </div>
  );
};

export default Invitations;
