import { gql } from 'apollo-server-micro';

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

export default typeDefs;
