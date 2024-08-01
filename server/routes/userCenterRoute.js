const router = require("express").Router();
const {
  profile,
  updateUserProfile,
  publishProduct,
} = require("../controllers/userCenterController");
const validators = require("../middlewares/validator");
const upload = require("../config/s3");

router.get("/", (req, res) => {
  const { _id, __v, password, ...userInfo } = req.user.toObject();
  return res.send(userInfo);
});

router.get("/profile", profile);

router.patch("/updateUserProfile", updateUserProfile);

router.post("/publishProduct", upload.array("pictures", 4), publishProduct);

module.exports = router;
