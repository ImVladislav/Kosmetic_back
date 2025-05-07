const Routes = require("express");

const router = new Routes();

// Import routes
const authRoutes = require("./auth");
const productRoutes = require("./product");
const brandRoutes = require("./brand");
const basketRoutes = require("./basket");
const typeRoutes = require("./type");
const orderRoutes = require("./order");

const menuRoutes = require("./menu");
const favoriteRoutes = require("./favorite");
const feedbackRoutes = require("./feedback");
const emailRoutes = require("./email");

// Routes
router.use("/products", productRoutes);
router.use("/auth", authRoutes);
router.use("/brands", brandRoutes);
router.use("/basket", basketRoutes);
router.use("/type", typeRoutes);

router.use("/order", orderRoutes);

// router.use("/favorite", favoriteRoutes);
// router.use("/feedback", feedbackRoutes);
router.use("/menu", menuRoutes);
// router.use("/email", emailRoutes);

module.exports = router;
