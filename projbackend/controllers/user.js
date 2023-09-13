const User = require("../models/user");
const Order = require("../models/order");

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
exports.updateUser = (req, res) => {
	User.findByIdAndUpdate(
		{ _id: req.profile._id },
		{ $set: req.body },
		{ new: true, useFindAndModify: false },
		(err, user) => {
			if (err) {
				return res.status(400).json({
					error: "You are not allowed to edit this",
				});
			}
			user.salt = undefined;
			user.encry_password = undefined;
			res.json(user);
		}
	);
};

exports.userPurchaseList = (req, res) => {
	Order.find({
		user: req.profile._id,
	})
		.poulate("user", "_id name")
		.exec((err, order) => {
			if (err) {
				return res
					.status(400)
					.json({ error: "No orderin this account" });
			}
			return res.json(order);
		});
};
