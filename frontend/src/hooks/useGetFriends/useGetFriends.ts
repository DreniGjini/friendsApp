import { useState, useCallback, useEffect } from 'react';
import { IFetchedFriends, IFriendsQuery } from './types';
import useBaseFetch from '../useBaseFetch';
import { HttpMethod } from '../../interfaces/enums/http';
import { useAppSelector } from '../../redux/hooks';

const useGetFriends = () => {
  const [loading, setLoading] = useState(false);
  const [friendsData, setFriendsData] = useState<IFetchedFriends>([
    {},
  ] as IFetchedFriends);
  const { id } = useAppSelector((state) => state.authReducer);

  const fetchAPI = useBaseFetch<IFriendsQuery, IFetchedFriends>(
    setLoading,
    setFriendsData,
  );

  const fetchUserFriends = useCallback(
    (userFriendsPathParams: IFriendsQuery) => {
      fetchAPI({
        url: `friends`,
        method: HttpMethod.GET,
        pathParams: userFriendsPathParams,
      });
    },
    [fetchAPI],
  );

  useEffect(() => {
    fetchUserFriends([id]);
  }, [fetchUserFriends]);

  return { loading, friendsData, fetchUserFriends };
};

export default useGetFriends;
