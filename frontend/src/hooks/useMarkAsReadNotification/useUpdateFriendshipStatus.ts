import { useState, useCallback } from 'react';
import {
  IMarkAsReadNotificationParams,
  IUpdatedNotificationRequest,
} from './types';
import useBaseFetch from '../useBaseFetch';
import { HttpMethod } from '../../interfaces/enums/http';

const useMarkNotificationAsRead = () => {
  const [loading, setLoading] = useState(false);
  const [notificationData, setNotificationData] =
    useState<IUpdatedNotificationRequest>({} as IUpdatedNotificationRequest);

  const fetchAPI = useBaseFetch<
    IMarkAsReadNotificationParams,
    IUpdatedNotificationRequest
  >(setLoading, setNotificationData);

  const markNotificationAsRead = useCallback(
    ({ id }: IMarkAsReadNotificationParams) => {
      fetchAPI({
        url: `notifications/mark-as-read`,
        method: HttpMethod.PATCH,
        pathParams: [id],
      });
    },
    [fetchAPI],
  );

  return { loading, notificationData, markNotificationAsRead };
};

export default useMarkNotificationAsRead;
