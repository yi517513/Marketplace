const router = require("express").Router();

router.get("/", (req, res) => {
  // 訂單管理
});

router.get("/cart", (req, res) => {
  // 購物車
});

router.get("/completedTransactions", (req, res) => {
  // 交易完成
});

module.exports = router;
