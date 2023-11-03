import axios, { AxiosResponse, AxiosError, Method } from 'axios';

const API_URL = 'https://api-fraude-production.up.railway.app/api';

type T = any;

interface FetchResponse<T> {
  data?: T;
  error?: AxiosError;
  loading: boolean;
}

interface FetchOptions {
  headers?: Record<string, string>;
}

const useAxios = () => {
  const fetchData = async (
    method: Method,
    url: string,
    body?: any,
    options?: FetchOptions,
  ): Promise<FetchResponse<T>> => {
    let responseState: FetchResponse<T> = {
      loading: true,
      data: undefined,
      error: undefined,
    };

    try {
      const response: AxiosResponse<T> = await axios({
        method,
        url: `${API_URL}${url}`,
        data: body,
        headers: options?.headers,
      });

      if (response.status >= 400) throw new Error(response.statusText);

      responseState = {
        ...responseState,
        data: response.data,
        loading: false,
      };
    } catch (error) {
      responseState = {
        ...responseState,
        loading: false,
        error: error as AxiosError,
      };
    }

    return responseState;
  };

  const get = (url: string, options?: FetchOptions) =>
    fetchData('GET', url, null, options);
  const post = (url: string, body: any, options?: FetchOptions) =>
    fetchData('POST', url, body, options);
  const put = (url: string, body: any, options?: FetchOptions) =>
    fetchData('PUT', url, body, options);
  const del = (url: string, options?: FetchOptions) =>
    fetchData('DELETE', url, null, options);

  return {
    get,
    post,
    put,
    delete: del,
  };
};

export default useAxios;
