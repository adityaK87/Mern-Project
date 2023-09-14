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

exports.pushOrderInPurchaseList = (req, res, next) => {
	let purchases = [];
	req.body.order.products.forEach((product) => {
		purchases.push({
			_id: product._id,
			name: product.name,
			description: product.description,
			category: product.category,
			quantity: product.quantity,
			amount: req.body.order.amount,
			transaction_Id: req.body.order.transaction_Id,
		});
	});

	//Store this in DB
	User.findOneAndUpdate(
		{
			_id: req.profile._id,
		},
		{ $push: { purchases: purchases } },
		{
			new: true,
		},
		//Because of this new :true we get a calllback to check if the new purchase list set or not
		(err, purchases) => {
			if (err) {
				return res.status(400).json({
					error: "Unable to save purchase List",
				});
			}
			next();
		}
	);
};
