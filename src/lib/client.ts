import { ApolloClient, createHttpLink,InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const createApolloClient = (url: string, token : string) => {
  const httpLink = createHttpLink({
    uri: `${url}graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      }
    };
  });
  const link = authLink.concat(httpLink);

  return new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });
};
