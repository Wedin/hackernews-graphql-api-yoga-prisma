async function feed(parent, args, context, info) {
  const filter = args.filter
    ? {
        OR: [{ description_contains: args.filter }, { url_contains: args.filter }],
      }
    : {};

  const links = await context.prisma.links({
    where: filter,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  });

  const count = await context.prisma
    .linksConnection({
      where: filter,
    })
    .aggregate()
    .count();
  return {
    links,
    count,
  };
}

module.exports = {
  feed,
};
