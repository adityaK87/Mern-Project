const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
	"/signup",
	[
		check("name", "name should be at least 3 char").isLength({ min: 3 }),
		check("email", "email is required").isEmail(),
		check("password", "password should be at least 3 char").isLength({
			min: 3,
		}),
	],
	signup
);
router.post(
	"/signin",
	[
		check("email", "email is required").isEmail(),
		check("password", "password field is required").isLength({
			min: 3,
		}),
	],
	signin
);
router.get("/signout", signout); // signout is coming from the auth controller

router.get("/testroute", isSignedIn, (req, res) => {
	res.json(req.auth);
});

//all the things have been exported wth router.
module.exports = router;
