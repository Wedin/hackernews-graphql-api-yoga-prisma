const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserId } = require("../utils");
const { JWT_APP_SECRET } = require("../config");

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });

  const token = jwt.sign({ userId: user.id }, JWT_APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }

  const isValidPassword = await bcrypt.compare(args.password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, JWT_APP_SECRET);

  return {
    token,
    user,
  };
}

function post(parent, args, context, info) {
  const userId = getUserId(context);

  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } },
  });
}

async function vote(parent, args, context, info) {
  const userId = getUserId(context);

  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId },
  });
  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: args.linkId } },
  });
}

module.exports = {
  signup,
  login,
  post,
  vote,
};
