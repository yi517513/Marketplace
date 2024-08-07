const router = require("express").Router();
const {
  register,
  login,
  sendVerifyCode,
  refreshAccessToken,
  logout,
  verifyAndRefreshAuth,
} = require("../controllers/authController");
const {
  passportJWT,
  passportLocal,
  authenticateJWT,
} = require("../middlewares/passport");
const validators = require("../middlewares/validator");

router.use("/", (req, res, next) => {
  console.log("Using authRoute");
  next();
});

router.post("/register", validators.register, register);

router.post("/login", validators.login, passportLocal, login);

router.post("/logout", logout);

router.post("/sendVerifyCode", sendVerifyCode);

router.post("/refreshAccessToken", passportJWT, refreshAccessToken);

router.get("/verifyAndRefreshAuth", authenticateJWT, verifyAndRefreshAuth);

module.exports = router;
