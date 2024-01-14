
export const typeDefs = `#graphql

 scalar DateTime

  type Blog {
    id: Int
    username: String
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
    username: String
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
    updateBlog(input: BlogUpdateInput!, id: Int!, username: String!): Blog
    deleteBlog(id: Int!, username: String!): [Blog!]
  }
`;
