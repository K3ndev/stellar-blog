export const typeDefs = `#graphql
  type Blog {
    id: ID!
    attributes: BlogAttributes!
  }

  type BlogAttributes {
    title: String!
    rating: Float
    body: String
    createdAt: String
    updatedAt: String
    publishedAt: String
  }

  type Query {
    blogs: [Blog!]!
  }
`;
