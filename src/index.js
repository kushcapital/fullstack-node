const express = require("express");
const tasksRouter = require("./tasks/tasks.router.js");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

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

app.use("/", tasksRouter);

//listening to the port 3001
app.listen(port, () => {
  console.log(`App listening on the port no: ${port}`);
});
