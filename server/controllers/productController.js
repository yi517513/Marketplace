const User = require("../models/userModel");
const Product = require("../models/productModel");

const postProduct = async (req, res) => {
  try {
    const { title, price, inventory, images, description } = req.body;
    const publisherId = req.user.id;

    // console.log(req.body);
    const newProduct = new Product({
      title,
      price,
      inventory,
      description,
      images,
      publisherId,
    });

    await newProduct.save();

    await User.findByIdAndUpdate(publisherId, {
      $push: { products: newProduct._id },
    });

    res.status(201).send({ data: newProduct._id, message: "成功新增商品" });
  } catch (error) {
    console.log(error);
    res.status(500).send("新增商品失敗");
  }
};

const getUserProducts = async (req, res) => {
  try {
    const publisherId = req.user.id;
    const foundProducts = await Product.find({ publisherId }).exec();
    console.log(foundProducts);
    return res.send({ message: null, data: foundProducts });
  } catch (error) {
    return res.status(500).send("伺服器發生錯誤");
  }
};

const getProductById = async (req, res) => {
  const userId = req.user.id;
  try {
    const { productId } = req.params;
    const foundProduct = await Product.findById(productId)
      .populate("publisherId", ["username", "phone"])
      .exec();

    const publisherId = foundProduct.publisherId._id.toString();
    if (userId !== publisherId) {
      return res.status(401).send({ message: "Unauthorized", data: null });
    }

    return res.status(200).send({ message: "修改商品", data: foundProduct });
  } catch (error) {
    res.status(500).send("伺服器發生錯誤");
  }
};

const updateProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { title, price, inventory, images, description } = req.body;
    const { productId } = req.params;

    const updateProduct = await Product.findByIdAndUpdate(
      { _id: productId },
      { title, price, inventory, images, description },
      { new: true }
    );

    return res
      .status(200)
      .send({ data: updateProduct._id, message: "成功更新商品" });
  } catch (error) {
    return res.status(500).send("伺服器發生錯誤");
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const foundProductAndDelete = await Product.findByIdAndDelete(productId);
    return res
      .status(200)
      .send({ data: foundProductAndDelete._id, message: "成功刪除商品" });
  } catch (error) {
    return res.status(500).send("伺服器發生錯誤");
  }
};

const toggleStatus = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    const foundProduct = await Product.findById(productId);

    if (!foundProduct) {
      return res.status(404).send({ message: "找不到商品" });
    }

    const status = foundProduct.status;
    const pendingShipment = foundProduct.pendingShipment;
    const inventory = foundProduct.inventory;

    if (status === "unavailable") {
      if (inventory <= 0) {
        return res.status(400).send("商品數量不足，無法上架");
      }
      foundProduct.status = "available";
      await foundProduct.save();
      return res.status(200).send({ message: "商品上架成功" });
    }

    if (status === "available") {
      if (pendingShipment > 0) {
        return res.status(400).send("有未處理訂單，無法下架");
      }
      foundProduct.status = "unavailable";
      await foundProduct.save();
      return res.status(200).send({ message: "商品下架成功" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("伺服器發生錯誤");
  }
};

module.exports = {
  postProduct,
  getUserProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  toggleStatus,
};
