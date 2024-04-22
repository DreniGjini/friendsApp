import { useState, useCallback } from 'react';
import { IFetchedNotification, IUseGetNotificationsParams } from './types';
import useBaseFetch from '../useBaseFetch';
import { HttpMethod } from '../../interfaces/enums/http';

const useGetUserNotifications = () => {
  const [loading, setLoading] = useState(false);
  const [notificationsData, setNotificationsData] =
    useState<IFetchedNotification>([{}] as IFetchedNotification);

  const fetchAPI = useBaseFetch<
    IFetchedNotification,
    IUseGetNotificationsParams
  >(setLoading, setNotificationsData);

  const getUserNotifications = useCallback(
    ({ id }: IUseGetNotificationsParams) => {
      fetchAPI({
        url: `notifications`,
        method: HttpMethod.GET,
        pathParams: [id],
      });
    },
    [fetchAPI],
  );

  return { loading, notificationsData, getUserNotifications };
};

export default useGetUserNotifications;
