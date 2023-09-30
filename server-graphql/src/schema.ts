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

  # 1
  type Query {
    blogs: [Blog!]!
  }

  input BlogInput {
    title: String!
    rating: Float
    body: String
    createdAt: String
    updatedAt: String
    publishedAt: String
  }

  # 2
  type Mutation {
    createBlog(input: BlogInput!): Blog
  }
`;
