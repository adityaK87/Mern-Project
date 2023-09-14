const express = require("express");
const router = express.Router();

const { getCategoryById } = require("../controllers/category");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserId } = require("../controllers/user"); //it just populates the parameters

router.param("userId", getUserId);
router.param("categoryId", getCategoryById);

module.exports = router;
