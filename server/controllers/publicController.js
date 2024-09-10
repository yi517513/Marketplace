const mongoose = require("mongoose");
const Product = require("../models/productModel");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");

const getAllPublicProducts = async (req, res) => {
  try {
    const foundProducts = await Product.find().exec();

    return res.send(foundProducts);
  } catch (error) {
    return res.status(500).send("伺服器發生錯誤");
  }
};

module.exports = {
  getAllPublicProducts,
};
