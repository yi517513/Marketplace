const router = require("express").Router();
const {
  postProduct,
  getUserProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  toggleStatus,
} = require("../../controllers/productController");
const validators = require("../../middlewares/validator");

// 新增
router.post("/", validators.publish, postProduct);

// 獲取使用者所有商品
router.get("/", getUserProducts);

// 根據ID獲取商品
router.get("/:productId", getProductById);

// 更新
router.patch("/:productId", updateProduct);

// 刪除
router.delete("/:productId", deleteProduct);

// 上下架
router.patch("/:productId/toggleStatus", toggleStatus);

module.exports = router;
