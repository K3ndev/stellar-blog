import { GraphQLDateTime } from "graphql-scalars";
import { db } from "./utils.js"
import { checkToken } from "./checkToken.js"

export const resolvers = {
    DateTime: GraphQLDateTime,
    Query: {
        blogs: ()  => {
            const getBlogs = async() => {
                const blogs = await db.blog.findMany({select: {
                    id: true,
                    username: true,
                    title: true,
                    rating: true,
                    body: true,
                    createdAt: true,
                    updatedAt: true
                },});

                return blogs
            }
            return getBlogs()
        },

        getSingleBlog: async(_: any, { id }: {id :number}) => {
            const blog = await db.blog.findUnique({ where: { id } });
            if (!blog) {
                throw new Error(`Blog with ID ${id} not found`);
            }
            return blog;
        },
    },
    Mutation: {
        createBlog: async(_: any, { input }: any, context: any) => {

            const tokenWithoutBearer = context.token.replace(/^Bearer\s/, '');
            if(!checkToken(tokenWithoutBearer)){
                return;
            }

            const newBlog = await db.blog.create({data: input,});
            return newBlog;
        },

        updateBlog: async (_:any, { input, id, username }:any, context: any) => {

            const tokenWithoutBearer = context.token.replace(/^Bearer\s/, '');
            if(!checkToken(tokenWithoutBearer)){
                return;
            }
            
            const blog = await db.blog.findUnique({ where: { id } });

            // Check if the blog exists
            if (!blog) {
                throw new Error('Blog not found');
            }

            // Check if the provided username matches the username associated with the blog
            if (username !== blog!.username) {
                throw new Error('Permission denied. You are not the owner of this blog.');
            } else {
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
            }


        },

        deleteBlog: async (_: any, { id, username }: { id: number, username: string }, context: any) => {

            const tokenWithoutBearer = context.token.replace(/^Bearer\s/, '');
            if(!checkToken(tokenWithoutBearer)){
                return;
            }

            const blog = await db.blog.findUnique({ where: { id } });

            // Check if the blog exists
            if (!blog) {
                throw new Error('Blog not found');
            }

            // Check if the provided username matches the username associated with the blog
            if (username !== blog!.username) {
                throw new Error('Permission denied. You are not the owner of this blog.');
            } else {
                const deletedBlog = await db.blog.delete({ where: { id }, });
                return [deletedBlog];
            }
        },
    },
};
