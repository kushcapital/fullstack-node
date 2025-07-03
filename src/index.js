const express = require("express");
const tasksRouter = require("./tasks/tasks.router.js");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const responseFormatter = require("./middleware/responseFormatter.js");
const {StatusCodes} = require("http-status-codes")
const authRouter = require("./auth/auth.router.js")

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
app.use("/", tasksRouter);
app.use("/", authRouter);


app.use((req,res)=>{
  res.status(StatusCodes.NOT_FOUND).json(null)
})
//listening to the port 3001
app.listen(port, () => {
  console.log(`App listening on the port no: ${port}`);
});
