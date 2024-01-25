import { ApolloClient, InMemoryCache } from '@apollo/client';

const createApolloClient = (url : string) => {
  return new ApolloClient({
    uri: `${url}/graphql`,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
