import { useState, useCallback } from 'react';
import { IFetchedUser, IUserQuery } from './types';
import useBaseFetch from '../useBaseFetch';
import { HttpMethod } from '../../interfaces/enums/http';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IFetchedUser>({} as IFetchedUser);

  const fetchAPI = useBaseFetch<IFetchedUser, IUserQuery>(setLoading, setData);

  const fetchUserByEmail = useCallback(
    (userQueryParams: IUserQuery) => {
      fetchAPI({
        url: `users/login`,
        method: HttpMethod.GET,
        queryParams: userQueryParams,
      });
    },
    [fetchAPI],
  );

  return { loading, data, fetchUserByEmail };
};

export default useLogin;
