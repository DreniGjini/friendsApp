import { useState, useCallback } from 'react';
import { IFetchedFriends, IFriendsQuery } from './types';
import useBaseFetch from '../useBaseFetch';
import { HttpMethod } from '../../interfaces/enums/http';

const useGetFriends = () => {
  const [loading, setLoading] = useState(false);
  const [friendsData, setFriendsData] = useState<IFetchedFriends>([{}] as IFetchedFriends);

  const fetchAPI = useBaseFetch< IFriendsQuery, IFetchedFriends>(
    setLoading,
    setFriendsData,
  );

  const fetchUserFriends = useCallback(
    (userFriendsPathParams: IFriendsQuery) => {
      fetchAPI({
        url: `friends`,
        method: HttpMethod.GET,
        pathParams: userFriendsPathParams
      });
    },
    [fetchAPI],
  );

  return { loading, friendsData, fetchUserFriends };
};

export default useGetFriends;
