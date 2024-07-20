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
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "5m" });
};

const gernerateRefreshToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };
  return jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "90m",
  });
};

const register = async (req, res) => {
  const { email, password, verificationCode } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    console.log(user);
    if (!user || user.verificationCode !== verificationCode) {
      return res.status(400).send("驗證碼錯誤或過期");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.verificationCode = undefined;
    user.username = email;
    await user.save();

    return res.status(201).send("註冊成功");
  } catch (error) {
    return res.status(500).send("伺服器發生錯誤 " + error.message);
  }
};

const login = (req, res) => {
  const user = req.user;
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

  return res.status(200).send("Login Successful");
};

const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  return res.status(200).send("登出成功");
};

const sendVerifyCode = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(400).send("此信箱已經被註冊過");
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
        return res.status(500).send("無法發送驗證碼");
      } else {
        return res.status(200).send("驗證碼已發送");
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

  console.log("refreshToken success");
  return res.status(200).send("Token refreshed successfully");
};

const verifyAndRefreshAuth = (req, res) => {
  const accessToken = req.cookies.accessToken;
  console.log("in verifyAndRefreshAuth route");

  jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
    console.log(user);
    if (err) {
      return res.status(401).send("accessTokenExpired");
    }

    const newRefreshToken = gernerateRefreshToken(user);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).send("Authenticated and refresh token updated");
  });
};

module.exports = {
  register,
  login,
  sendVerifyCode,
  refreshAccessToken,
  logout,
  verifyAndRefreshAuth,
};
