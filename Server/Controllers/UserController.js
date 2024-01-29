const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");
const User = require("../Models/User.js");

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!(fullName || email || password)) {
    res.status(400);
    throw new Error("Please Enter All The Fields!");
  }
  const userExistsByEmail = await User.findOne({ email });

  if (userExistsByEmail) {
    res.status(409);
    throw new Error(`User with email '${email}' already exists`);
  }

  const user = await User.create({
    fullName,
    email,
    password,
  });
  if (user) {
    res.status(201).json({ user, token: generateToken(user._id) });
  } else {
    res.status(400);
    throw new Error("Failed to Create a User");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
  });

  if (user) {
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (passwordIsCorrect) {
      res.status(201).json({ user, token: generateToken(user._id) });
    } else {
      res.status(400);
      throw new Error("Invalid User Password");
    }
  } else {
    res.status(400);
    throw new Error("Invalid User Email");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json({ users });
});

module.exports = { registerUser, loginUser, getAllUsers };
