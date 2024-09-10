const router = require("express").Router();
const {
  getAllTransactions,
  getOrders,
  getInProgress,
  getPendingShipment,
  confirmShipment,
  getPurchaseHistory,
  getSalesHistory,
} = require("../../controllers/transactionController");

// 所有訂單資料
router.get("/:userId", getAllTransactions);

// 訂單 - 買方
router.get("/:userId/orders", getOrders);

// 移交中 - 買方
router.get("/:userId/inProgress", getInProgress);

// 待發貨 - 賣方
router.get("/:userId/pendingShipment", getPendingShipment);

// 完成出售的訂單資料
router.get("/:userId/salesHistory", getSalesHistory);

// 完成購買的訂單資料
router.get("/:userId/purchaseHistory", getPurchaseHistory);

// 完成出貨
router.patch("/:transactionId/confirmShipment", confirmShipment);

module.exports = router;
