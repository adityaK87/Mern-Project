const express = require("express");
const router = express.Router();

router.get("/signout", (req, res) => {
	res.send("User has been signed out");
});

//all the things have been exported wth router.
module.exports = router;
