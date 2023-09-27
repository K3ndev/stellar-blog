// import express from "express";
// import cors from "cors";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema'
import { resolvers } from './resolver'

const createApolloServer = () => {
    return new ApolloServer({
        typeDefs,
        resolvers,
    });
};

const startServer = async () => {
    const server = createApolloServer();
    const { url } = await startStandaloneServer(server, {
        listen: { port: 1337 },
    });
    console.log(`Server is running at ${url}`);
};


// Start the server
const main = async () => {
    // const app = express();
    // app.use(cors());

    // graphql
    await startServer();
};

main();


