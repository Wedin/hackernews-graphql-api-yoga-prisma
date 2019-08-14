const jwt = require("jsonwebtoken");
const { JWT_APP_SECRET } = require("../config");

module.exports = function(req, res, next) {
  // I'd rather have this as a cookie
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, JWT_APP_SECRET);
    console.log("attach", userId);
    req.userId = userId;
  }

  next();
};
