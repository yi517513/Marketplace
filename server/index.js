const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
require("dotenv").config();
const cors = require("cors");

mongoose
  .connect("mongodb://localhost:27017/ECtestDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);

app.listen(8080, () => {
  console.log("Server is running on port 8080....");
});
