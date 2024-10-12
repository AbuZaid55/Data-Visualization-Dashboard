import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { data } from './data';
import {user} from './user'
import JWTService from '../services/jwt';

export async function initServer() {
    const app = express();
    app.use(express.json())
    const graphqlServer = new ApolloServer({
        typeDefs: `#graphql
            ${data.types}
            ${user.types}
            type Query {
                ${data.queries}
                ${user.queries}
            }
            type Mutation {
                ${user.mutations}
            }
        `,
        resolvers: {
            Query: {
                ...data.resolver.queries,
                ...user.resolvers.queries
            },
            Mutation: {
                ...user.resolvers.mutations
            }
        }
    });

    await graphqlServer.start();
    app.use("/graphql", expressMiddleware(graphqlServer,{
        context:async({req,res})=>{
            return {
                user:req.headers.authorization?JWTService.decondeToken(req.headers.authorization.split("Bearer ")[1]):undefined
            }
        }
    }));
    return app;
}
