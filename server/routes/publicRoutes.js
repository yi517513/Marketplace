const router = require("express").Router();
const { getProductById } = require("../controllers/productController");

// 公共路由 - 根據商品ID獲取詳情
router.get("/productDetail/:productId", getProductById);

module.exports = router;
