const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/users");

const app = express();
mongoose
  .connect(
    "mongodb+srv://bondotsaguria:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.2sotydo.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Connection failed", error.message);
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use("/api/user", userRoutes);

module.exports = app;
