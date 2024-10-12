import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { data } from './data';

export async function initServer() {
    const app = express();
    app.use(express.json())
    const graphqlServer = new ApolloServer({
        typeDefs: `#graphql
            ${data.types}
            type Query {
                ${data.queries}
            }
        `,
        resolvers: {
            Query: {
                ...data.resolver.queries
            }
        }
    });

    await graphqlServer.start();
    app.use("/graphql", expressMiddleware(graphqlServer));
    return app;
}
