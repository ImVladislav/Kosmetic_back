const jwt = require("jsonwebtoken");

const { User } = require("../models");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  console.log(authorization);

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log(token);

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    console.log(id);
    const user = await User.findByPk(id);
    if (!user || !user.token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    next();
  }
};

module.exports = authenticate;
