const User = require("../models/userModel");
const Product = require("../models/productModel");

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

const publishProduct = async (req, res) => {
  const { title, price, inventory, description } = req.body;
  const pictures = req.files ? req.files.map((file) => file.location) : []; // S3 上的 URL
  const publisherId = req.user.id;

  // console.log(pictures);
  try {
    const newProduct = new Product({
      title,
      price,
      inventory,
      description,
      pictures,
      publisherId,
    });
    let result = await newProduct.save();
    console.log(result);
    // 更新用戶的產品列表
    await User.findByIdAndUpdate(publisherId, {
      $push: { products: newProduct._id },
    });

    res.status(201).send({ message: "產品上傳成功", product: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

module.exports = { profile, updateUserProfile, publishProduct };
