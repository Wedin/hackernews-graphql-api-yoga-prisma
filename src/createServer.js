const { GraphQLServer } = require("graphql-yoga");
require("./config");
// Read config before creating prisma client
const { prisma } = require("./generated/prisma-client");
const Subscription = require("./resolvers/Subscription");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Vote = require("./resolvers/Vote");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
};

function createServer() {
  return new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context: request => {
      return {
        ...request,
        prisma,
      };
    },
  });
}

module.exports = createServer;
