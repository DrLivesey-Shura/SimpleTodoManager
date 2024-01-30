const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const TaskRoutes = require("./Routes/TaskRoutes.js");
require("dotenv").config();

// Mongo DB Connections
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then((response) => {
    console.log("MongoDB Connection Succeeded.");
  })
  .catch((error) => {
    console.log("Error in DB connection: " + error);
  });

// Middleware Connections
app.use(cors());
app.use(express.json());

// Routes
app.use("/task", TaskRoutes);

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running in port: " + PORT);
});
