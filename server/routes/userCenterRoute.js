const router = require("express").Router();

router.get("/", (req, res) => {
  const { _id, __v, password, ...userInfo } = req.user.toObject();
  return res.send(userInfo);
});

module.exports = router;
