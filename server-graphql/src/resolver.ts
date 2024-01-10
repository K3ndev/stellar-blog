import { GraphQLDateTime } from "graphql-scalars";
import { db } from "./utils.js"

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
        createBlog: async(_: any, { input }: any) => {
            const newBlog = await db.blog.create({data: input,});
            return newBlog;
        },

        updateBlog: async(_: any, { input, id }: any) => {
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
        
        deleteBlog: async(_: any, { id }: {id : number}) => {
            const deletedBlog = await db.blog.delete({where: { id },});
            return [deletedBlog];
        },
    },
};
