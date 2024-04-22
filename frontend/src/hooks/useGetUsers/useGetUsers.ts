import { useState, useCallback, useEffect } from 'react';
import { IFetchedUsers } from './types';
import useBaseFetch from '../useBaseFetch';
import { HttpMethod } from '../../interfaces/enums/http';
import { useAppSelector } from '../../redux/hooks';

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState<IFetchedUsers>([
    {},
  ] as IFetchedUsers);
  const { id } = useAppSelector((state) => state.authReducer);

  const fetchAPI = useBaseFetch<IFetchedUsers>(setLoading, setUsersData);

  const getUsers = useCallback(
    (userId: string) => {
      fetchAPI({
        url: `users/users`,
        method: HttpMethod.GET,
        pathParams: [userId],
      });
    },
    [fetchAPI],
  );

  useEffect(() => {
    getUsers(id);
  }, [getUsers]);
  return { loading, usersData, getUsers };
};

export default useGetUsers;
