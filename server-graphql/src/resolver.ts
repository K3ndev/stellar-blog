import { GraphQLDateTime } from "graphql-scalars";

// Sample data for blogs
const blogs = [
    {
        id: 1,
        attributes: {
            title: 'Sample Blog 1',
            rating: 4,
            body: 'This is the first sample blog post.',
            createdAt: '2023-09-27T12:00:00Z',
            updatedAt: '2023-09-27T14:30:00Z',
            publishedAt: '2023-09-27T12:30:00Z',
        },
    },
    {
        id: 2,
        attributes: {
            title: 'Sample Blog 2',
            rating: 3,
            body: 'This is the second sample blog post.',
            createdAt: '2023-09-28T09:15:00Z',
            updatedAt: '2023-09-28T11:45:00Z',
            publishedAt: '2023-09-28T10:00:00Z',
        },
    },
];

export const resolvers = {
    DateTime: GraphQLDateTime,
    Query: {
        blogs: () => blogs,
    },
    Mutation: {
        createBlog: (_, { input }) => {

            const newBlog = {
                id: (blogs.length + 1),
                attributes: input,
            };

            blogs.push(newBlog);
            return newBlog;
        },
    },
};
