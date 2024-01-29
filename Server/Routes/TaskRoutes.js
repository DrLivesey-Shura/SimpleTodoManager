// routes/tasks.js
const { Router } = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../Controllers/TaskControllers");
const routes = new Router();

routes.post("/", createTask);

routes.get("/", getTasks);

routes.put("/:id", updateTask);

routes.delete("/:id", deleteTask);

module.exports = routes;
