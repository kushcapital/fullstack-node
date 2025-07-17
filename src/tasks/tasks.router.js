const express = require("express");
const { validationResult } = require("express-validator");
const taskController = require("./tasks.controller.js");
const { StatusCodes } = require("http-status-codes");
const tasksRouter = express.Router();
const createTaskValidator = require("./validators/createTask.validator.js");
const getTaskValidator = require("./validators/getTasks.validator.js");
const updateTaskValidator = require("./validators/updateTask.validator.js");
const deleteTaskValidator = require("./validators/deleteTask.validaror.js");

tasksRouter.get("/tasks", getTaskValidator, (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return taskController.handleGetTasks(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

tasksRouter.post("/tasks", createTaskValidator, (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return taskController.handlePostTasks(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

tasksRouter.patch("/tasks", updateTaskValidator, (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return taskController.handlePatchTasks(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

tasksRouter.delete("/tasks", deleteTaskValidator, (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return taskController.handleDeleteTasks(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = tasksRouter;
