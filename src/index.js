const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const configureApp = require("./settings/config.js");

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envfile = `.env.${process.env.NODE_ENV}`;

dotenv.config({ path: envfile });

const app = express();
const port = parseInt(process.env.PORT); //http://localhost:3001/

app.use(express.json());

configureApp(app);


async function bootstrap() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbname: process.env.DATABASE_NAME,
    });
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
