const router = require("express").Router();
const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidator");
const {
  register,
  login,
  sendVerifyCode,
} = require("../controllers/authController");

const registerValidator = (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) {
    console.log("In validation middleware");
    return res.status(400).send({ errorMessage: error.details[0].message });
  }
  next();
};
const loginValidator = (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) {
    console.log("In validation middleware");
    return res.status(400).send({ errorMessage: error.details[0].message });
  }
  next();
};

router.use("/", (req, res, next) => {
  console.log("Using authRoute");
  next();
});

router.post("/register", registerValidator, register);

router.post("/login", loginValidator, login);

router.post("/sendVerifyCode", sendVerifyCode);

module.exports = router;
