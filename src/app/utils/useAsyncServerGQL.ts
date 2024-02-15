import { DocumentNode } from '@apollo/client';
import Bugsnag from '@bugsnag/js';
import { createApolloClient } from 'lib/client';

const client = createApolloClient(process.env.NEXT_PUBLIC_CONTACTS_API!, '');

const useAsyncServerGQL = async (query: DocumentNode) => {
  try {
    const { data } = await client.query({ query });
    if (data) {
      return data;
    } else {
      Bugsnag.notify('Error getting data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    Bugsnag.notify('Error fetching data');
  }
};

export default useAsyncServerGQL;
