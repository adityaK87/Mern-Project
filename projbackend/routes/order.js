const express = require("express");
const router = express.Router();

const { isAuthenticated, isSignedIn, isAdmin } = require("../controllers/auth");
const { getUserId, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

const { getOrderbyId } = require("../controllers/order");

//params
router.param("userId", getUserId);
router.param("orderId", getOrderbyId);

//All routes

module.exports = router;
