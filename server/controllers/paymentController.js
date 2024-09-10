const mongoose = require("mongoose");
const Product = require("../models/productModel");
const Transaction = require("../models/transactionModel");
const { sendMessageToRoom } = require("../sockets/socketService");

const createOrder = async (req, res) => {
  const { sellerId, productId, price, purchaseQuantity, paymentMethod } =
    req.body;
  const { buyerId } = req.params;

  try {
    const totalAmount = price * purchaseQuantity;

    const newTransaction = new Transaction({
      buyerId,
      sellerId,
      productId,
      purchaseQuantity,
      price,
      totalAmount,
      paymentMethod,
      paymentStatus: "pending",
      shipmentStatus: "pending",
    });

    await newTransaction.save();

    return res
      .status(201)
      .send({ message: "創建訂單成功", newData: newTransaction });
  } catch (error) {
    console.log(error);
    res.status(500).send("創建訂單時發生錯誤");
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { transactionId } = req.params;
    await Transaction.findByIdAndDelete(transactionId);
    return res.status(200).send({ message: "成功刪除訂單" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("伺服器發生錯誤");
  }
};

const handlePayment = async (req, res) => {
  const { paymentMethod } = req.body;
  const { transactionId } = req.params;
  const userId = req.user.id;

  // 金流API，先假定 return true
  const APIresult = true;

  if (!APIresult) {
    return res.status(400).send("付款時發生錯誤!");
  }

  // 開啟一個事務
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 獲取交易紀錄
    const transaction = await Transaction.findById(transactionId).session(
      session
    );
    if (!transaction) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).send("找不到交易紀錄");
    }

    // 檢查庫存
    const foundProduct = await Product.findById(transaction.productId).session(
      session
    );
    // console.log(foundProduct);
    if (transaction.purchaseQuantity > foundProduct.inventory) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send("商品數量不足");
    }

    // 庫存處理
    foundProduct.inventory -= transaction.purchaseQuantity;
    foundProduct.pendingShipment += 1;
    if (foundProduct.inventory === 0) {
      foundProduct.status = "unavailable";
    }
    await foundProduct.save({ session });

    // 更新交易紀錄的付款狀態
    transaction.paymentStatus = "completed";
    await transaction.save({ session });

    await session.commitTransaction();

    // 在付款成功后，通过控制器发送通知
    const sellerId = transaction.sellerId.toString();
    sendMessageToRoom("message", sellerId, {
      message: "你有一個新的訂單需要處理",
    });

    return res
      .status(200)
      .send({ message: "付款成功", updateDataId: transaction });
  } catch (error) {
    // 僅在事物仍處於活動狀態時回滾
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    console.log(error);
    res.status(500).send("付款處理時發生錯誤");
  } finally {
    session.endSession();
  }
};

module.exports = {
  handlePayment,
  createOrder,
  deleteOrder,
};
