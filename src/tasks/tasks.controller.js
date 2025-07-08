const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const createTaskProvider = require("./providers/createTask.provider.js");
const getTasksProvier = require("./providers/getTasks.provider.js");

async function handleGetTasks(req, res) {
  const tasks = await getTasksProvier(req, res);
  res.status(StatusCodes.OK).json(tasks); //adding middleware to process for statuscodes
}

async function handlePostTasks(req, res) {
  await createTaskProvider(req, res);
}

function handlePatchTasks(req, res) {
  res.send("PATCH tasks controller");
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
