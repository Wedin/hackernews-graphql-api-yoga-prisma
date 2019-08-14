const createServer = require("./createServer");
const { PORT } = require("./config");
const port = PORT || 4000;

const server = createServer();
server.start({ port: port }, () => console.log(`Server is running on http://localhost:${port}`));
