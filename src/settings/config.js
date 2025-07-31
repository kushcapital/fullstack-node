const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const authRouter = require("../auth/auth.router.js");
const createUser = require("../users/users.router.js");
const tasksRouter = require("../tasks/tasks.router.js");
const responseFormatter = require("../middleware/responseFormatter.js");
const expressWinstonLogger = require("../middleware/expressWinston.middleware.js");

function configureApp(app) {
  app.use(cors());

  let accessLogStream = fs.createWriteStream(
    path.join(__dirname, "..", "access.log"),
    {
      flags: "a",
    }
  );

  app.use(morgan("combined", { stream: accessLogStream }));

  app.use(responseFormatter); //note the middleware should be above to route inorder to middlware to process before sending the response.
  app.use(expressWinstonLogger);

  /*define routers*/
  app.use("/", tasksRouter);
  app.use("/auth", authRouter);
  app.use("/users", createUser);

  app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json(null);
  });
}

module.exports = configureApp;
