const express = require("express");
const router = express.Router();

const {
	getCategoryById,
	createCategory,
	getCategory,
	getAllCategory,
} = require("../controllers/category");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserId } = require("../controllers/user"); //it just populates the parameters

//Params
router.param("userId", getUserId);
router.param("categoryId", getCategoryById);

//Actual Routes
router.post(
	"/category/create/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	createCategory
);

router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

module.exports = router;
