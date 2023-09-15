const express = require("express");
const router = express.Router();

const { getProductById, createProduct } = require("../controllers/product");
const { isAuthenticated, isSignedIn, isAdmin } = require("../controllers/auth");
const { getUserId } = require("../controllers/user");

// all of Params
router.param("userId", getUserId);
router.param("productId", getProductById);

//All of actual routes
router.post(
	"/product/create/:userId",
	isAuthenticated,
	isSignedIn,
	isAdmin,
	createProduct
);
module.exports = router;
