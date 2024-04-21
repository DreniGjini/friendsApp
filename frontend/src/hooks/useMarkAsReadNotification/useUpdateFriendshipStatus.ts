import { useState, useCallback } from 'react';
import {  IMarkAsReadNotificationParams, IUpdatedNotificationRequest } from './types';
import useBaseFetch from '../useBaseFetch';
import { HttpMethod } from '../../interfaces/enums/http';

const useMarkNotificationAsRead = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<IUpdatedNotificationRequest>({} as IUpdatedNotificationRequest);

  const fetchAPI = useBaseFetch<IMarkAsReadNotificationParams, IUpdatedNotificationRequest>(
    setLoading,
    setUserData,
  );

  const markNotificationAsRead = useCallback(
    ({id}: IMarkAsReadNotificationParams) => {
      fetchAPI({
        url: `notifications/mark-as-read`,
        method: HttpMethod.PATCH,
        pathParams: [id]
      });
    },
    [fetchAPI],
  );

  return { loading, userData, markNotificationAsRead };
};

export default useMarkNotificationAsRead;
