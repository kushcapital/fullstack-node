const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const createTaskProvider = require("./providers/createTask.provider.js");
const getTasksProvier = require("./providers/getTasks.provider.js");
const updateTaskProvider = require("./providers/update.Task.provider.js");
const deleteTaskProvider = require("./providers/deleteTask.provider.js");

async function handleGetTasks(req, res) {
  return await getTasksProvier(req, res);
}

async function handlePostTasks(req, res) {
  return await createTaskProvider(req, res);
}

async function handlePatchTasks(req, res) {
  const updatedTask = await updateTaskProvider(req, res);
  res.status(StatusCodes.OK).json(updatedTask); //adding middleware to process for statuscodes
}

async function handleDeleteTasks(req, res) {
  const deleteTask = await deleteTaskProvider(req, res);
  res.status(StatusCodes.OK).json(deleteTask); //adding middleware to process for statuscodes
}

module.exports = {
  handleGetTasks,
  handlePostTasks,
  handlePatchTasks,
  handleDeleteTasks,
};
