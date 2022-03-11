const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  const existEmail = await User.findOne({ email });

  if (existEmail) {
    return res.status(400).json({
      message: "Email Existed",
    });
  }

  const genSalt = await bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hash(password, genSalt);

  const register = await User.create({
    email,
    firstname,
    lastname,
    password: hashPassword,
  });

  if (register) {
    res.status(200).json({
      message: "Successfully Registerd new account",
    });
  } else {
    res.status(400).json({
      message: "Unable to register new account",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const checkEmail = await User.findOne({ email });

  if (checkEmail && (await bcrypt.compare(password, checkEmail.password))) {
    const token = jwt.sign({ id: checkEmail._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .cookie("jwt_token", token, {
        httpOnly: true,
      })
      .json({
        email: checkEmail.email,
        firstname: checkEmail.firstname,
        lastname: checkEmail.lastname,
      });
  } else {
    res.status(400).clearCookie("jwt_token").json({
      message: "Failed to Log in with this credentials",
    });
  }
});

module.exports = router;
