const { Router } = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../Controllers/UserController");
const routes = new Router();

// Add routes
routes.post("/", registerUser);
routes.post("/login", loginUser);
routes.get("/", getAllUsers);

module.exports = routes;
