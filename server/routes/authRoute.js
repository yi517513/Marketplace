const router = require("express").Router();
const User = require("../models/userModel");
const registerValidation =
  require("../validators/authValidator").registerValidation;
const loginValidation = require("../validators/authValidator").loginValidation;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.use("/", (req, res, next) => {
  console.log("Using authRoute");
  next();
});

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send({ errorMessage: error.details[0].message });
  }
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(400).send({ errorMessage: "此信箱已經被註冊過" });
    }

    const newUser = new User({ username: email, email, password });
    await newUser.save();
    return res.status(201).send({ successMessage: "註冊成功" });
  } catch (error) {
    return res
      .status(500)
      .send({ errorMessage: "伺服器發生錯誤 " + error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).send({ errorMessage: error.details[0].message });
    }

    const { email, password } = req.body;
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) {
      return res.status(400).send({ errorMessage: "信箱或密碼錯誤" });
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(400).send({ errorMessage: "信箱或密碼錯誤" });
    }

    const payload = { id: foundUser._id, email: foundUser.email };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    const { username } = foundUser;
    const userData = { username, email };
    return res.status(200).send({
      successMessage: "登入成功",
      token: `Bearer ${token}`,
      userData,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ errorMessage: "伺服器發生錯誤 " + error.message });
  }
});

module.exports = router;
