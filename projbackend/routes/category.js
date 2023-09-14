const express = require("express");
const router = express.Router();

const {
	getCategoryById,
	createCategory,
	getCategory,
	getAllCategory,
	updateCategory,
} = require("../controllers/category");

const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserId } = require("../controllers/user"); //it just populates the parameters

//Params
router.param("userId", getUserId);
router.param("categoryId", getCategoryById);

//Actual Routes

// Create route
router.post(
	"/category/create/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	createCategory
);

//Read route
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

// update route

router.put(
	"/category/:categoryId/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateCategory
);

//Delete route

module.exports = router;
