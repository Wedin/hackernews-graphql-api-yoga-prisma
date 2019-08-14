const createServer = require("./createServer");
const { getMiddlewares } = require("./middlewares");
const { PORT } = require("./config");
const port = PORT || 4000;

const server = createServer();

const middlewares = getMiddlewares();
middlewares.forEach(middleware => server.express.use(middleware));

server.start({ port: port }, () => console.log(`Server is running on http://localhost:${port}`));
