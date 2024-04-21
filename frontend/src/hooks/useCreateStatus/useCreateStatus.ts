import { useState, useCallback } from 'react';
import { ICraetedStatus, CreateStatusSchema } from './types';
import useBaseFetch from '../useBaseFetch';
import { HttpMethod } from '../../interfaces/enums/http';

const useCreateStatus = () => {
  const [loading, setLoading] = useState(false);
  const [statusData, setStatusData] = useState<ICraetedStatus>({} as ICraetedStatus);

  const fetchAPI = useBaseFetch<CreateStatusSchema, ICraetedStatus>(
    setLoading,
    setStatusData,
  );

  const createStatus = useCallback(
    (createStatusSchema: CreateStatusSchema) => {
      fetchAPI({
        url: `status`,
        method: HttpMethod.POST,
        body: createStatusSchema,
      });
    },
    [fetchAPI],
  );

  return { loading, statusData, createStatus };
};

export default useCreateStatus;
