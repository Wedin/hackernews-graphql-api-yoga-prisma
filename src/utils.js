const jwt = require("jsonwebtoken");
const { JWT_APP_SECRET } = require("./config");

function getUserId(context) {
  const authorizationHeader = context.request.get("Authorization");

  if (authorizationHeader) {
    const token = authorizationHeader.replace("Bearer ", "");
    const { userId } = jwt.verify(token, JWT_APP_SECRET);
    return userId;
  }

  throw new Error("Not authenticated");
}

module.exports = {
  getUserId,
};
