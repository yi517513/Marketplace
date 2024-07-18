const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const passport = require("passport");
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
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2m" });
};

const gernerateRefreshToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };
  return jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "60m",
  });
};

const register = async (req, res) => {
  const { email, password, verificationCode } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    console.log(user);
    if (!user || user.verificationCode !== verificationCode) {
      return res.status(400).send({ errorMessage: "驗證碼錯誤或過期" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.verificationCode = undefined;
    user.username = email;
    await user.save();

    return res.status(201).send({ successMessage: "註冊成功" });
  } catch (error) {
    return res
      .status(500)
      .send({ errorMessage: "伺服器發生錯誤 " + error.message });
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).send({ errorMessage: "伺服器發生錯誤" });
    }
    if (!user) {
      return res.status(400).send({ errorMessage: info.message });
    }
    const accessToken = gernerateToken(user);
    const refreshToken = gernerateRefreshToken(user);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // 在生產環境中啟用 secure 標記
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // 在生產環境中啟用 secure 標記
    });

    return res.status(200).send({
      successMessage: "Login Successful",
    });
  })(req, res, next);
};

const sendVerifyCode = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(400).send({ errorMessage: "此信箱已經被註冊過" });
    }

    const verificationCode = CryptoJS.lib.WordArray.random(3).toString(
      CryptoJS.enc.Hex
    );

    console.log(verificationCode);
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
        return res.status(500).send({ errorMessage: "無法發送驗證碼" });
      } else {
        return res.status(200).send({ successMessage: "驗證碼已發送" });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .send({ errorMessage: "伺服器發生錯誤 " + error.message });
  }
};

const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(403).send({ errorMessage: "請重新登入" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
    if (err) {
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      return res.status(403).send({ errorMessage: "請重新登入" });
    }

    const newAccessToken = gernerateToken(user);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).send({
      successMessage: "Token refreshed successfully",
    });
  });
};

const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.status(200).send({ successMessage: "登出成功" });
};

const checkAuth = (req, res) => {
  if (req.user) {
    return res.status(200).send({ successMessage: "Authenticated" });
  } else {
    console.log("未通過jwt保護");
    return res.status(401).send({ errorMessage: "未通過passport-jwt保護" });
  }
};

module.exports = {
  register,
  login,
  sendVerifyCode,
  refreshToken,
  logout,
  checkAuth,
};
