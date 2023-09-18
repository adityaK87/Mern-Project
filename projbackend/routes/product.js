const express = require("express");
const router = express.Router();

const {
	getProductById,
	createProduct,
	getProduct,
	photo,
	updateProduct,
	deleteProduct,
	getAllProducts,
	getAllUniquecategories,
} = require("../controllers/product");
const { isAuthenticated, isSignedIn, isAdmin } = require("../controllers/auth");
const { getUserId } = require("../controllers/user");

// all of Params
router.param("userId", getUserId);
router.param("productId", getProductById);

//All of actual routes
//Create route
router.post(
	"/product/create/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	createProduct
);

//read route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//delete route
router.delete(
	"/product/:productId/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	deleteProduct
);

//update route
router.put(
	"/product/:productId/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateProduct
);

//listing route
router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniquecategories);

module.exports = router;
