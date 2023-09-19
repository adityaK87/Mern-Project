const express = require("express");
const router = express.Router();

const { isAuthenticated, isSignedIn, isAdmin } = require("../controllers/auth");
const { getUserId, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

const { getOrderbyId, createOrder } = require("../controllers/order");

//params
router.param("userId", getUserId);
router.param("orderId", getOrderbyId);

//All routes
//create
router.post(
	"/order/create/:userId",
	isSignedIn,
	isAuthenticated,
	pushOrderInPurchaseList,
	updateStock,
	createOrder
);

module.exports = router;
