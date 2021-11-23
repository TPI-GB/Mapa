const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const method = authHeader.split(" ")[0];
    token = authHeader.split(" ")[1];
    if (method != "Bearer" || !token) {
      return res.status(403).send("A token is required for authentication");
    }
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
