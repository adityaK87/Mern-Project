const User = require("../models/user");

exports.getUserId = (req, res, next, id) => {
	User.findById(id).exec((err, user) => {
		if (err || !user) {
			return res.status(404).json({
				error: "No user found in DB",
			});
		}
		req.profile = user;
		next();
	});
};

exports.getUser = (req, res) => {
	//TODO:get back here for password
	return res.json(req.profile);
};
