import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { useSessionStore } from 'app/stores/globalStore';

const useAsync = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userLoginResponse: token } = useSessionStore(state => state);

  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.token}`,
          },
        });
        const dataResult = await result.json();
        setData(dataResult);
      } catch (error) {
        Bugsnag.notify(getErrorMessage(error));
        setError(getErrorMessage(error));
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useAsync;
