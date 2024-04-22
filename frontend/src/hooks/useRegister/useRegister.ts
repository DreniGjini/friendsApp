import { useState, useCallback } from 'react';
import { IFetchedUser, IUserSchema } from './types';
import useBaseFetch from '../useBaseFetch';
import { HttpMethod } from '../../interfaces/enums/http';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IFetchedUser>({} as IFetchedUser);

  const fetchAPI = useBaseFetch<IUserSchema, IFetchedUser>(setLoading, setData);

  const registerUser = useCallback(
    (userSchema: IUserSchema) => {
      fetchAPI({
        url: `users/register`,
        method: HttpMethod.POST,
        body: userSchema,
      });
    },
    [fetchAPI],
  );

  return { loading, data, registerUser };
};

export default useRegister;
