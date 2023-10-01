import { GraphQLDateTime } from "graphql-scalars";

export const typeDefs = `#graphql

 scalar DateTime

  type Blog {
    id: ID!
    attributes: BlogAttributes!
  }

  type BlogAttributes {
    title: String!
    rating: Float
    body: String
    createdAt: DateTime
    updatedAt: DateTime
    publishedAt: DateTime
  }

  # 1
  type Query {
    blogs: [Blog!]!
  }

  input BlogInput {
    title: String!
    rating: Float
    body: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  # 2
  type Mutation {
    createBlog(input: BlogInput!): Blog
  }
`;

// todo! make an enum for rating 1 to 10