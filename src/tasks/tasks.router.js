const express = require("express");
const taskController = require("./tasks.controller.js");
const tasksRouter = express.Router();

tasksRouter.get("/tasks", taskController.handleGetTasks);

tasksRouter.post("/tasks", taskController.handlePostTasks);

tasksRouter.patch("/tasks", taskController.handlePatchTasks);

tasksRouter.delete("/tasks", taskController.handleDeleteTasks);

module.exports = tasksRouter;
