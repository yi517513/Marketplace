const router = require("express").Router();
const {
  postProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../../controllers/productController");
const validators = require("../../middlewares/validator");

// 新增
router.post("/", validators.publish, postProduct);

// 獲取所有商品
router.get("/", getAllProducts);

// 根據ID獲取商品
router.get("/:productId", getProductById);

// 更新
router.patch("/:productId", updateProduct);

// 刪除
router.delete("/:productId", deleteProduct);

module.exports = router;
