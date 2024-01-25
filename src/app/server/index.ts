import { ApolloServer, gql } from 'apollo-server-micro';
import productResolvers from 'app/graphQL/productResolvers';

const typeDefs = gql`
  type Product {
    id: ID!
    title: String!
    description: String!
    price: Float!
    isPack: Boolean!
    # Add other fields as needed
  }

  type Query {
    products: [Product!]!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: [productResolvers], // Ensure productResolvers is an array
});

export default server.createHandler({ path: '/api/graphql' });
