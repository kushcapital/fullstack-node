const express = require("express");
const taskController = require("./tasks.controller.js")
const tasksRouter = express.Router();

tasksRouter.get("/tasks", taskController.handleGetTasks);

tasksRouter.post("/tasks", (req, res) => {
  console.log(req.body);
  return res.send("Create a new Task");
});

module.exports = tasksRouter;
