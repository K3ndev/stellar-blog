import { gql } from "@apollo/client";

export const BLOGS_QUERY = gql`
  query blogs{
    blogs {
      id,
      username,
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
    $username: String!,
    $body: String!,
    $rating: Int!,
    $createdAt: DateTime!,
    $updatedAt: DateTime!
  ) {
    createBlog(
      input: {
        title: $title,
        username: $username
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

export const GET_SINGLE_BLOG = gql`
  query getSingleBlog($id: Int!) {
    getSingleBlog(id: $id) {
      id
      username
      body
      createdAt
      updatedAt
      rating
      title
    }
  }
`;


export const DELETE_SINGLE_BLOG = gql`
  mutation DeleteBlog($id: Int!, $username: String!) {
    deleteBlog(id: $id, username: $username) {
      id
    }
  }
`;

export const UPDATE_SINGLE_BLOG = gql`
  mutation updateBlog($input: BlogUpdateInput!, $updateBlogId: Int!, $username: String!) {
    updateBlog(input: $input, id: $updateBlogId, username: $username) {
      body,
      rating,
      title
    }
  }
`;