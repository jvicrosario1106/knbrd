const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protectedRoutes = async (req, res, next) => {
  const token = req.cookies.jwt_token;

  if (token) {
    try {
      const decode = jwt.decode(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (err) {
      res.status(401).json({
        message: "Not Authorised",
      });
    }
  }

  if (!token) {
    res.status(401).json({
      message: "Not Authorised",
    });
  }
};

module.exports = protectedRoutes;
