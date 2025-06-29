const { StatusCodes, ReasonPhrases } = require("http-status-codes");

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
  res.status(StatusCodes.OK).json({
    status: "sucess",
    StatusCodes: StatusCodes.OK,
    message: ReasonPhrases.OK,
    data: response,
  });
}

function handlePostTasks(req, res) {
  res.send("POST tasks controller");
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
