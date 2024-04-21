import { useState, useCallback } from 'react';
import { IFetchedFriendRequest, ISendRequestSchema } from './types';
import useBaseFetch from '../useBaseFetch';
import { HttpMethod } from '../../interfaces/enums/http';

const useSendFriendRequest = () => {
  const [loading, setLoading] = useState(false);
  const [returnData, setReturnData] = useState<IFetchedFriendRequest>({} as IFetchedFriendRequest);

  const fetchAPI = useBaseFetch<ISendRequestSchema, IFetchedFriendRequest>(
    setLoading,
    setReturnData,
  );

  const sendFriendRequest = useCallback(
    (friendRequestSchema: ISendRequestSchema) => {
      fetchAPI({
        url: `friends`,
        method: HttpMethod.POST,
        body: friendRequestSchema,
      });
    },
    [fetchAPI],
  );

  return { loading, returnData, sendFriendRequest };
};

export default useSendFriendRequest;
