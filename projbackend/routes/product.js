const express = require("express");
const router = express.Router();

const {
	getProductById,
	createProduct,
	getProduct,
	photo,
} = require("../controllers/product");
const { isAuthenticated, isSignedIn, isAdmin } = require("../controllers/auth");
const { getUserId } = require("../controllers/user");

// all of Params
router.param("userId", getUserId);
router.param("productId", getProductById);

//All of actual routes
router.post(
	"/product/create/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	createProduct
);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

module.exports = router;
