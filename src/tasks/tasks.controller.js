const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const createTaskProvider = require("./providers/createTask.provider.js");
const getTasksProvier = require("./providers/getTasks.provider.js");
const updateTaskProvider = require("./providers/update.Task.provider.js");

async function handleGetTasks(req, res) {
  const tasks = await getTasksProvier(req, res);
  res.status(StatusCodes.OK).json(tasks); //adding middleware to process for statuscodes
}

async function handlePostTasks(req, res) {
  const tasks = await createTaskProvider(req, res);
  res.status(StatusCodes.OK).json(tasks); //adding middleware to process for statuscodes
}

async function handlePatchTasks(req, res) {
  const updatedTask = await updateTaskProvider(req, res);
  res.status(StatusCodes.OK).json(updatedTask); //adding middleware to process for statuscodes
}

function handleDeleteTasks(req, res) {
  res.send("DELETE tasks controller");
}

module.exports = {
  handleGetTasks,
  handlePostTasks,
  handlePatchTasks,
  handleDeleteTasks,
};
