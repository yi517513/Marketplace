require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const http = require("http");
const { initializeSocket } = require("./sockets/socketService");

const authRoute = require("./routes/authRoute");
const userCenter = require("./routes/userCenterRoute");
const publicRoutes = require("./routes/publicRoutes");
const paymentRoute = require("./routes/paymentRoute");
const socket = require("./sockets/socket");
const { passport_Access, passport_Refresh } = require("./middlewares/passport");

const server = http.createServer(app);
const io = initializeSocket(server); // 初始化 Socket.IO
const path = require("path");

mongoose
  .connect("mongodb://localhost:27017/EC")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

// 設置 cors 選項
const corsOptions = {
  origin: "http://localhost:4000", // 允許的來源網址
  methods: ["GET", "POST", "PATCH", "DELETE"], // 允許的 HTTP 方法
  allowedHeaders: ["Content-Type", "Authorization"], // 允許的頭部信息
  credentials: true, // 允許跨域設置 cookies
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser()); // 解析 cookies
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsOptions));

app.use(passport.initialize());

socket(io);

app.get("/test-ejs", (req, res) => {
  res.render("index", {
    title: "EJS 測試",
    paymentHtml: `<form id="_form_aiochk" action="https://example.com" method="post">
      <input type="hidden" name="test" value="測試表單" />
      <script type="text/javascript">console.log("表單加載成功");</script>
    </form>`,
  });
});

// 認證相關路由
app.use("/api/auth", authRoute);

// 用戶中心相關路由
app.use("/api/userCenter", passport_Refresh, userCenter);

// 付款相關路由
app.use("/api/payment", passport_Access, paymentRoute);

// 公共路由
app.use("/api", publicRoutes);

server.listen(8080, () => {
  console.log("Server is running on port 8080....");
});
