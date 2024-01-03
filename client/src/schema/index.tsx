import { gql } from "@apollo/client";

export const BLOGS_QUERY = gql`
  query blogs{
    blogs {
      id,
      body,
      createdAt,
      updatedAt,
      rating,
      title
    }
  }
`;

export const CREATE_BLOG = gql`
  mutation CreateBlog(
    $title: String!,
    $body: String!,
    $rating: Int!,
    $createdAt: DateTime!,
    $updatedAt: DateTime!,
  ) {
    createBlog(
      input: {
        title: $title,
        body: $body,
        rating: $rating,
        createdAt: $createdAt,
        updatedAt: $updatedAt
      }
    ) {
      body,
      createdAt,
      updatedAt,
      rating,
      title
    }
  }
`;