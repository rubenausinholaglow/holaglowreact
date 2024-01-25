import { ApolloClient, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    uri: 'https://localhost:7096/graphql',
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
