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

export const GET_SINGLE_BLOG = gql`
  query getSingleBlog($id: Int!) {
    getSingleBlog(id: $id) {
      id
      body
      createdAt
      updatedAt
      rating
      title
    }
  }
`;


export const DELETE_SINGLE_BLOG = gql`
  mutation DeleteBlog($id: Int!) {
    deleteBlog(id: $id) {
      id
    }
  }
`;

export const UPDATE_SINGLE_BLOG = gql`
  mutation updateBlog($input: BlogUpdateInput!, $updateBlogId: Int!) {
    updateBlog(input: $input, id: $updateBlogId) {
      body,
      rating,
      title
    }
  }
`;