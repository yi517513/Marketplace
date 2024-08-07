const User = require("../models/userModel");
const Product = require("../models/productModel");

const postProduct = async (req, res) => {
  try {
    const { title, price, inventory, images, description } = req.body;
    const publisherId = req.user.id;

    console.log(req.body);
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

    res.status(201).send(newProduct._id);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const publisherId = req.user.id;
    const foundProducts = await Product.find({ publisherId }).exec();
    console.log(foundProducts);
    return res.send(foundProducts);
  } catch (error) {
    return res.status(500).send("伺服器發生錯誤");
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const foundProduct = await Product.findById(productId);
    return res.status(200).send(foundProduct);
  } catch (error) {
    res.status(500).send("伺服器發生錯誤");
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title, price, inventory, images, description } = req.body;
    console.log(req.body);
    const { productId } = req.params;
    const foundProduct = await Product.findByIdAndUpdate(
      { _id: productId },
      { title, price, inventory, images, description },
      { new: true }
    );

    // console.log(foundProduct);
    return res.status(200).send(foundProduct);
  } catch (error) {
    return res.status(500).send("伺服器發生錯誤");
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const foundProductAndDelete = await Product.findByIdAndDelete(productId);
    console.log(foundProductAndDelete);
    return res.status(200).send("成功刪除商品");
  } catch (error) {
    return res.status(500).send("伺服器發生錯誤");
  }
};

module.exports = {
  postProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
