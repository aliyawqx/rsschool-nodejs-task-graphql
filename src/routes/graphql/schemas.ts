import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import { PrismaClient, User } from '@prisma/client';
import { ContextType } from './context.js';

const prisma = new PrismaClient();

const UserType: GraphQLObjectType = new GraphQLObjectType<User, ContextType>({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    subs: {
      type: new GraphQLList(UserType),
      resolve: (user, _args, context) => {
        return context.loaders.userSubsLoader.load(user.id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => {
        return await prisma.user.findMany();
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
