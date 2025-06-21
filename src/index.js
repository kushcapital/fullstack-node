const express = require("express");
const tasksRouter = require("./tasks/tasks.router.js")
const app = express();
const port = 3001; //http://localhost:3001/

app.use("/",tasksRouter)

//listening to the port 3001
app.listen(port, () => {
  console.log(`App listening on the port no: ${port}`);
});
