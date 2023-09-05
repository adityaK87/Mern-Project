const express = require("express");
const router = express.Router();
const { signout } = require("../controllers/auth");

router.get("/signout", signout); // signout is coming from the auth controller

//all the things have been exported wth router.
module.exports = router;
