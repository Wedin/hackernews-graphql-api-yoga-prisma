const { GraphQLServer } = require("graphql-yoga");
require("./config"); // Read config before creating prisma client
const { prisma } = require("./generated/prisma-client");

console.log(process.env["PRISMA_ENDPOINT"]);
console.log("index", process.env.JWT_APP_SECRET);
console.log("index", process.env.PRISMA_ENDPOINT);

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
};

//TODO IMPLEMENT THESE:
// updateLink: (parent, args) => {
//   const linkToUpdate = links.find(link => link.id === args.id);
//   if (!linkToUpdate) {
//     throw new Error("Invalid ID");
//   }
//   linkToUpdate.description = args.description;
//   linkToUpdate.url = args.url;

//   return linkToUpdate;
// },
// deleteLink: (parent, args) => {
//   const linkToDelete = links.find(link => link.id === args.id);
//   if (!linkToDelete) {
//     throw new Error("Invalid ID");
//   }
//   links = links.filter(link => link.id !== args.id);
//   return linkToDelete;
// },

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    };
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
