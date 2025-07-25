const express = require("express");
const tasksRouter = require("./tasks/tasks.router.js");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const responseFormatter = require("./middleware/responseFormatter.js");
const { StatusCodes } = require("http-status-codes");
const authRouter = require("./auth/auth.router.js");
const createUser = require("./users/users.router.js");
const mongoose = require("mongoose");
const expressWinstonLogger = require("./middleware/expressWinston.middleware.js");

const app = express();
const port = 3001; //http://localhost:3001/

app.use(express.json());

const corsOptions = {
  origin: ["example.com", "example2"],
};

app.use(cors(corsOptions));

console.log(path.join(__dirname));

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

async function bootstrap() {
  try {
    await mongoose.connect(
      "mongodb+srv://kushwaharajeev:%40Aryan12345@nodejs.exgbf6f.mongodb.net/",
      { dbname: "fullstackTasks" }
    );
    console.log("Connected to MongoDB");
    //listening to the port 3001
    app.listen(port, () => {
      console.log(`App listening on the port no: ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

bootstrap();
