const router = require("express").Router();
const buyerRoutes = require("./userCenter/buyerRoutes");
const productsRoutes = require("./userCenter/productsRoutes");
const userRoutes = require("./userCenter/userRoutes");
const imageRoutes = require("./userCenter/imageRoute");

router.use("/buyer", buyerRoutes);
router.use("/products", productsRoutes);
router.use("/user", userRoutes);
router.use("/images", imageRoutes);

module.exports = router;
