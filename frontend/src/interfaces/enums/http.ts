export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface FetchParams<TBody, TQueryParams> {
  url: string;
  method: HttpMethod;
  body?: TBody;
  queryParams?: TQueryParams;
  pathParams?: string[] | Record<string, string>;
}
