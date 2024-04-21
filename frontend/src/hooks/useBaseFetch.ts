import { useCallback } from 'react';
import { FetchParams } from '../interfaces/enums/http';
import { serialize } from '../utils/serializeToQueryString';

const useBaseFetch = <TBody = undefined, TQueryParams = undefined>(
  setLoading: (loading: boolean) => void,
  setUserData: React.Dispatch<React.SetStateAction<any>>,
) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const fetchAPI = useCallback(
    async ({
      url,
      method,
      body,
      queryParams,
      pathParams,
    }: FetchParams<TBody, TQueryParams>) => {
      setLoading(true);
      let fullUrl = baseUrl + url;

      if (Array.isArray(pathParams)) {
        fullUrl += '/' + pathParams.join('/');
      } else if (typeof pathParams === 'object') {
        for (const [key, value] of Object.entries(pathParams)) {
          fullUrl = fullUrl.replace(`:${key}`, encodeURIComponent(value));
        }
      }

      if (queryParams) {
        const serializer = serialize(queryParams);
        fullUrl += serializer;
      }

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      try {
        const response = await fetch(fullUrl, {
          method: method,
          headers: headers,
          body: ['GET', 'DELETE'].includes(method)
            ? undefined
            : JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error('Error fetching');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },   
    [setLoading, setUserData, baseUrl],
  );

  return fetchAPI;
};

export default useBaseFetch;
