import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { toasterAtom, ToasterType } from '@/utils/atoms/toaster';
import { ApiData } from '@/api/ApiService';
import { useHistory } from 'react-router-dom';
import { routes } from '@/constants/routes';

export interface isSuccess {
  isSuccess: boolean;
}

export function useApi<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiPromise: (data?: any) => Promise<ApiData<T>>,
  withSuccessNotification = false,
  withFailureNotification = false,
  withLoadingNotification = true,
) {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setToasterState] = useRecoilState(toasterAtom);
  const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function fetchApi(data?: any): Promise<ApiData<T> & isSuccess> {
    if (withLoadingNotification) {
      setToasterState({ title: 'Information', message: 'Loading Response...', type: ToasterType.INFO, isShown: true });
      console.log('Loading...');
    }
    try {
      const response = await apiPromise(data);
      console.log(response);
      if (response?.message && withSuccessNotification) {
        setToasterState({ title: 'Success', message: response.message, type: ToasterType.SUCCESS, isShown: true });
        console.log({ message: response.message });
      } else if (response && withSuccessNotification) {
        setToasterState({ title: 'Success', message: 'API Call Successful', type: ToasterType.SUCCESS, isShown: true });
        console.log({ message: 'API Call Successful' });
      }
      console.log(response);
      return { ...response, isSuccess: true };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.data?.message && withFailureNotification) {
        setToasterState({ title: 'Error', message: error.data.message, type: ToasterType.ERROR, isShown: true });
        console.error({ message: error.data.message });
      }
      if (error?.status === 403) {
        history.push(routes.authentication.login);
      }
      console.log(error);
      return { ...error?.data, isSuccess: false };
    } finally {
      setIsLoading(false);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function callApi(data?: any) {
    if (!isLoading) {
      setIsLoading(true);
      const response = await fetchApi(data);
      return response;
    }
    return { message: 'Internal Server Error', isSuccess: false };
  }

  return [callApi] as const;
}
