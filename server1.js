"use strict";

const express = require("express");
const app = express();
const path = require("path");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp")();
const cors = require("cors")();
const fileupload = require("express-fileupload")();
const cookieParser = require("cookie-parser")();
const { config } = require("dotenv");
//Connection to db imported from config files
const connectDB = require("./config/db");
const users = require("./routes/user");
const inventory = require("./routes/inventory");
const request = require("./routes/request");

//Load environment variables
config({ path: "./config/config.env" });

connectDB();

//Sanitize against NoSQL injection
app.use(mongoSanitize());

// @ts-ignore
app.use(helmet());
app.use(hpp);

//Allow Cross Origin Connection
app.use(cors);
//Allow use of cookies
app.use(cookieParser);
//Allows JSON to be parsed
app.use(express.json());
//Allows for form data
app.use(express.urlencoded({ extended: true }));
//Allows for file and photo upload 
app.use(fileupload);
//Set static folder to house images
app.use(express.static(path.join(__dirname + "/public")));

const PORT = process.env.port || 7000;

//DocGen URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.use("/api/users", users);
app.use("/api/inventory", inventory);
app.use("/api/requests", request);
const server = app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  server.close(() => process.exit(1));
});
