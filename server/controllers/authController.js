const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const CryptoJS = require("crypto-js");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const gernerateToken = (user) => {
  const payload = {
    id: user.id,
  };
  return jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: "5m" });
};

const gernerateRefreshToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };
  return jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const register = async (req, res) => {
  const { email, password, verificationCode } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user || user.verificationCode !== verificationCode) {
      return res.status(400).send("驗證碼錯誤或過期");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.verificationCode = undefined;
    user.username = email;
    user.veriftyed = true;
    await user.save();

    return res.status(201).send({ message: "註冊成功" });
  } catch (error) {
    return res.status(500).send("伺服器發生錯誤 " + error.message);
  }
};

const login = (req, res) => {
  const user = req.user;
  const accessToken = gernerateToken(user);
  const refreshToken = gernerateRefreshToken(user);
  // console.log(user);
  // console.log(req.body);

  try {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // 在生產環境中啟用 secure 標記
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // 在生產環境中啟用 secure 標記
    });

    return res.status(200).send({ message: "登入成功", userId: user.id });
  } catch (error) {
    return res.status(500).send("伺服器發生錯誤");
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    return res.status(200).send({ message: "成功登出" });
  } catch (error) {
    return res.status(500).send("伺服器發生錯誤");
  }
};

const sendVerifyCode = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser && existingUser.veriftyed === true) {
      return res.status(400).send("此信箱已經被註冊過");
    }

    const verificationCode = CryptoJS.lib.WordArray.random(3).toString(
      CryptoJS.enc.Hex
    );

    await User.findOneAndUpdate(
      { email },
      { verificationCode },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verification Code",
      text: `Your verification code is ${verificationCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send("無法發送驗證碼");
      } else {
        console.log(verificationCode);
        return res.status(200).send({ message: "驗證碼已發送" });
      }
    });
  } catch (error) {
    return res.status(500).send("伺服器發生錯誤 " + error.message);
  }
};

const refreshAccessToken = (req, res) => {
  const user = req.user;
  const newAccessToken = gernerateToken(user);

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  // console.log("refreshToken success");
  return res.status(200).send("Token refreshed successfully");
};

module.exports = {
  register,
  login,
  sendVerifyCode,
  refreshAccessToken,
  logout,
};
