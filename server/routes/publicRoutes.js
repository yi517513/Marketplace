const router = require("express").Router();
const { getProductById } = require("../controllers/productController");
const { getAllPublicProducts } = require("../controllers/publicController");

// 公共路由 - 根據商品ID獲取詳情
router.get("/productDetail/:productId", getProductById);

router.get("/", getAllPublicProducts);

module.exports = router;
