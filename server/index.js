require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const cors = require("cors");
const passport = require("passport");
const userCenter = require("./routes/userCenterRoute");
const cookieParser = require("cookie-parser");

mongoose
  .connect("mongodb://localhost:27017/ECtestDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

// 設置 cors 選項
const corsOptions = {
  origin: "http://localhost:3000", // 允許的來源網址
  methods: ["GET", "POST", "PATCH"], // 允許的 HTTP 方法
  allowedHeaders: ["Content-Type", "Authorization"], // 允許的頭部信息
  credentials: true, // 允許跨域設置 cookies
};

app.use(cookieParser()); // 解析 cookies
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsOptions));

app.use(passport.initialize());

app.use("/api/user", authRoute);
app.use(
  "/api/userCenter",
  passport.authenticate("jwt", { session: false }),
  userCenter
);

app.listen(8080, () => {
  console.log("Server is running on port 8080....");
});
