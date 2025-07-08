const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const Task = require("./task.schema.js");

function handleGetTasks(req, res) {
  let response = [
    {
      title: "Title of the task",
      id: 1,
      description: "Complete the project documentation",
      completed: false,
      priority: "high",
      createdAt: new Date().toISOString(),
    },
    {
      title: "Review code changes",
      id: 2,
      description: "Review pull request #123",
      completed: true,
      priority: "medium",
      createdAt: new Date().toISOString(),
    },
  ];
  res.status(StatusCodes.OK).json(response); //adding middleware to process for statuscodes
}

async function handlePostTasks(req, res) {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
    });
    await task.save();
    res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Validation failed",
        details: error.message,
      });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error",
      details: error.message,
    });
  }
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
