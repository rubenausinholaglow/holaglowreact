import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';

const useAsyncClient = (url: string, method?: string) => {
  const [dataApi, setDataApi] = useState<any>(null);
  const [error, setError] = useState<Error | unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (url: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const jsonResult = await response.json();
      setDataApi(jsonResult);
    } catch (error) {
      setError(error);
      Bugsnag.notify(`${url} ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (method !== 'POST') fetchData(url);
  }, [url]);

  return { dataApi, error, isLoading };
};

export default useAsyncClient;
