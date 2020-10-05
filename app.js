"use strict";

const express = require("express");
const app = express();
const path = require("path");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
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
const property = require("./routes/property");
const replacement = require("./routes/replacement");

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


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info:{
        title: 'inventory - api',
        description: "An inventory management backend that allows users to request, replace and purchase items",
        contact: {
          name: "Oluwatomisin Ajakaiye",
          nickname: "T Ajax"
        },
        servers: ["http://localhost:5000"]
    }

  },
  apis: ['./routes/*.js']

}

// @ts-ignore
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


//DocGen URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.use("/api/users", users);
app.use("/api/inventory", inventory);
app.use("/api/requests", request);
app.use("/api/property", property);
app.use("/api/replacement", replacement);

module.exports = app;