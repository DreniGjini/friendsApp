import { useState, useCallback } from 'react';
import { IUpdateFriendshipSchema, IUpdatedFriendshipRequest } from './types';
import useBaseFetch from '../useBaseFetch';
import { HttpMethod } from '../../interfaces/enums/http';

const useUpdateFriendshipStatus = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<IUpdatedFriendshipRequest>(
    {} as IUpdatedFriendshipRequest,
  );

  const fetchAPI = useBaseFetch<
    IUpdateFriendshipSchema,
    IUpdatedFriendshipRequest
  >(setLoading, setUserData);

  const updateFriendRequest = useCallback(
    (updateFriendshipSchema: IUpdateFriendshipSchema, id: string) => {
      fetchAPI({
        url: `friends`,
        method: HttpMethod.PATCH,
        body: updateFriendshipSchema,
        pathParams: [id],
      });
    },
    [fetchAPI],
  );

  return { loading, userData, updateFriendRequest };
};

export default useUpdateFriendshipStatus;
