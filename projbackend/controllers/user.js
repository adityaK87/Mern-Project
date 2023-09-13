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
	req.profile.salt = undefined;
	req.profile.encry_password = undefined;
	return res.json(req.profile);
};

//Get All the Users
exports.getAllUsers = (req, res) => {
	User.find().exec((err, users) => {
		if (err || !users) {
			return res.status(404).json({
				error: " No user Found In DB",
			});
		}
		res.status(200).json(users);
	});
};
