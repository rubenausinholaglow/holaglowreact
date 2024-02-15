import { useEffect, useState } from 'react';
import { DocumentNode } from '@apollo/client';
import Bugsnag from '@bugsnag/js';
import { createApolloClient } from 'lib/client';

const client = createApolloClient(process.env.NEXT_PUBLIC_CONTACTS_API!, '');

const useAsyncClientGQL = (query: DocumentNode) => {
  const [dataApi, setDataApi] = useState<any>(null);
  const [error, setError] = useState<Error | unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (query: DocumentNode) => {
    setIsLoading(true);
    try {
      const { data } = await client.query({ query });
      if (data) {
        setDataApi(data);
      } else {
        Bugsnag.notify('Error getting data');
      }
    } catch (error) {
      setError(error);
      console.error('Error fetching data:', error);
      Bugsnag.notify('Error fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(query);
  }, [query]);

  return { dataApi, error, isLoading };
};

export default useAsyncClientGQL;
