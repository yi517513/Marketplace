const router = require("express").Router();
const {
  handlePayment,
  createOrder,
  deleteOrder,
} = require("../controllers/paymentController");

router.post("/options/:buyerId", createOrder);

router.delete("/:transactionId", deleteOrder);

router.post("/processing/:transactionId", handlePayment);

module.exports = router;
