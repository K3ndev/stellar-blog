import { GraphQLDateTime } from "graphql-scalars";

export const typeDefs = `#graphql

 scalar DateTime

  type Blog {
    id: Int
    attributes: BlogAttributes!
  }

  type BlogAttributes {
    title: String!
    rating: Int
    body: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    blogs: [Blog!]!
    getSingleBlog(id: Int!): Blog
  }

  input BlogCreateInput {
    title: String!
    rating: Int
    body: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  input BlogUpdateInput {
    title: String!
    rating: Float
    body: String
  }

  type Mutation {
    createBlog(input: BlogCreateInput!): Blog
    updateBlog(input: BlogUpdateInput!, id: Int!): Blog
    deleteBlog(id: Int!): [Blog!]
  }
`;
