import { GraphQLDateTime } from "graphql-scalars";

// Sample data for blogs
let blogs = [
    {
        id: 1,
        attributes: {
            title: 'Sample Blog 1',
            rating: 4,
            body: 'This is the first sample blog post.',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            // publishedAt: '2023-09-27T12:30:00Z',
        },
    },
    {
        id: 2,
        attributes: {
            title: 'Sample Blog 2',
            rating: 3,
            body: 'This is the second sample blog post.',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            // publishedAt: '2023-09-28T10:00:00Z',
        },
    },
];

export const resolvers = {
    DateTime: GraphQLDateTime,
    Query: {
        blogs: () => blogs,
        getSingleBlog: (_, { id }) => {
            const foundElement = blogs.find(item => item.id === id);

            if (!foundElement) {
                throw new Error(`Blog with ID ${id} not found`);
            }

            return foundElement;
        },
    },
    Mutation: {
        createBlog: (_, { input }) => {

            const newBlog = {
                id: blogs[blogs.length - 1].id + 1,
                attributes: input,
            };

            blogs.push(newBlog);
            return newBlog;
        },
        updateBlog: (_, { input, id }) => {
            
            const foundIndex = blogs.findIndex(item => item.id === id);

            if (foundIndex === -1) {
                throw new Error(`Blog with ID ${id} not found`);
            }
    
            blogs[foundIndex].attributes.title = input.title
            blogs[foundIndex].attributes.rating = input.rating
            blogs[foundIndex].attributes.body = input.body
            blogs[foundIndex].attributes.updatedAt = new Date().toISOString()

            return blogs[foundIndex];
        },
        deleteBlog: (_, {id }) => {
            
            const result = blogs.filter(item => item.id !== id);
            blogs = [...result]
    
            return result
        },
    },
};
