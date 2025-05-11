const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { SECRET_KEY } = process.env;

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const [bearer, token] = authHeader.split(" ");
    if (bearer === "Bearer" && token) {
      const decoded = jwt.verify(token, SECRET_KEY);
      const user = await User.findByPk(decoded.id);
      if (user) req.user = user;
    }
  } catch (_) {
    // нічого не робимо — просто продовжуємо
  }
  next();
};

module.exports = optionalAuth;
