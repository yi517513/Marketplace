const User = require("../models/userModel");

const profile = (req, res) => {
  return res.send(req.user);
};

const updateUserProfile = async (req, res) => {
  console.log("in updateUserProfile route");
  try {
    const userId = req.user.id;
    const { username, birthday, gender, phone, address } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        username,
        birthday,
        gender,
        phone,
        address,
      },
      { new: true }
    );
    res.status(200).send("用戶資料更新成功");
  } catch (error) {
    res.status(500).send("無法更新用戶資料");
  }
};

module.exports = { profile, updateUserProfile };
