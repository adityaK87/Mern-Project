const express = require("express");
const router = express.Router();

const { getUserId, getUser, getAllUsers } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserId);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.get("/users", getAllUsers);

module.exports = router;
