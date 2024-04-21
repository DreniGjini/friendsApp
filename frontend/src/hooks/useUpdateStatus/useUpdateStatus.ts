import { useState, useCallback } from 'react';
import { IUpdatedStatus, UpdateStatusSchema } from './types';
import useBaseFetch from '../useBaseFetch';
import { HttpMethod } from '../../interfaces/enums/http';

const useUpdateStatus = () => {
  const [loading, setLoading] = useState(false);
  const [statusData, setStatusData] = useState<IUpdatedStatus>(
    {} as IUpdatedStatus,
  );

  const fetchAPI = useBaseFetch<UpdateStatusSchema, IUpdatedStatus>(
    setLoading,
    setStatusData,
  );

  const updateStatus = useCallback(
    (createStatusSchema: UpdateStatusSchema, id: string) => {
      fetchAPI({
        url: `status`,
        method: HttpMethod.PATCH,
        body: createStatusSchema,
        pathParams: [id],
      });
    },
    [fetchAPI],
  );

  return { loading, statusData, updateStatus };
};

export default useUpdateStatus;
