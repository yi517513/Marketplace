const router = require("express").Router();
const {
  profile,
  updateUserProfile,
} = require("../controllers/userCenterController");

router.get("/", (req, res) => {
  const { _id, __v, password, ...userInfo } = req.user.toObject();
  return res.send(userInfo);
});

router.get("/profile", profile);

router.patch("/updateUserProfile", updateUserProfile);

module.exports = router;
