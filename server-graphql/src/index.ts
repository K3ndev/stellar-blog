import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';

import { typeDefs } from './schema';
import { resolvers } from './resolver.js'

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    // if true, it gives autosuggest but its giving information disclosure
    introspection: false,
    csrfPrevention: true
});

await server.start();

const corsOptions = {
    origin: ['http://localhost:3000'],
    // include credentials like cookies
    // credentials: true,
};

app.use(
    '/',
    cors<cors.CorsRequest>(corsOptions),
    express.json(),
    expressMiddleware(server),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 1337 }, resolve));
console.log(`🚀 Server ready at http://localhost:1337/graphql`);