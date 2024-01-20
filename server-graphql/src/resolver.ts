import { GraphQLDateTime } from "graphql-scalars";
import { db } from "./utils.js"
import { checkToken } from "./checkToken.js"

export const resolvers = {
    DateTime: GraphQLDateTime,
    Query: {
        blogs: async () => {
            
            return await db.blog.findMany({
                select: {
                    id: true,
                    username: true,
                    title: true,
                    rating: true,
                    body: true,
                    createdAt: true,
                    updatedAt: true
                },
            });
        },

        getSingleBlog: async (_: any, { id }: { id: number }) => {

            const blog = await db.blog.findUnique({ where: { id } });
            if (!blog) {
                throw new Error(`Blog with ID ${id} not found`);
            }
            return blog;
        },
    },
    Mutation: {
        createBlog: async (_: any, { input }: any, context: any) => {

            // Check token validity
            const tokenWithoutBearer = context.token.replace(/^Bearer\s/, '');
            if (!checkToken(tokenWithoutBearer)) {
                throw new Error('Token is invalid');
            }
        
            // Create a new blog
            const newBlog = await db.blog.create({
                data: input,
            });
        
            return newBlog;
        },
        

        updateBlog: async (_: any, { input, id, username }: any, context: any) => {
            
            // Check token validity
            const tokenWithoutBearer = context.token.replace(/^Bearer\s/, '');
            if (!checkToken(tokenWithoutBearer)) {
                throw new Error('Token is invalid');
            }
        
            // Retrieve the blog
            const blog = await db.blog.findUnique({ where: { id } });
        
            // Check if the blog exists and if the user has the right permissions
            if (!blog || username !== blog.username) {
                throw new Error('Permission denied. Blog not found or you are not the owner.');
            }
        
            // Update the blog
            const updatedBlog = await db.blog.update({
                where: { id },
                data: {
                    title: input.title,
                    rating: input.rating,
                    body: input.body,
                    updatedAt: new Date().toISOString(),
                },
            });
        
            return updatedBlog;
        },
        

        deleteBlog: async (_: any, { id, username }: { id: number, username: string }, context: any) => {

            // Check token validity
            const tokenWithoutBearer = context.token.replace(/^Bearer\s/, '');
            if (!checkToken(tokenWithoutBearer)) {
                throw new Error('token is invalid');;
            }

            const blog = await db.blog.findUnique({ where: { id } });

            // Check if the blog exists
            if (!blog) {
                throw new Error('Blog not found');
            }

            // Check if the user has the right permissions
            if (username !== 'dashboard' && username !== blog.username) {
                throw new Error('Permission denied. You are not the owner of this blog.');
            }

            // Delete the blog
            const deletedBlog = await db.blog.delete({ where: { id } });
            return [deletedBlog];

        },
    },
};
