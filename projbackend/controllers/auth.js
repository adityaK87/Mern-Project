require("dotenv").config();
const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var { expressjwt: expressJwt } = require("express-jwt");

exports.signup = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({
			error: errors.array()[0].msg,
		});
	}
	const user = new User(req.body); //saving user to model User
	user.save((err, user) => {
		if (err) {
			return res.status(400).json({
				err: "NOT able to save user in DB",
			});
		}
		res.json({
			name: user.name,
			email: user.email,
			id: user._id,
		});
	});
};

exports.signout = (req, res) => {
	res.json({
		message: "user has been signed out",
	});
};

exports.signin = (req, res) => {
	const { email, password } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({
			error: errors.array()[0].msg,
		});
	}

	User.findOne({ email }, (err, user) => {
		if (err) {
			res.status(400).json({
				error: "USER email does not exist",
			});
		}
		if (!user.authenticate()) {
			return res.status(401).json({
				error: "Email and password do not match",
			});
		}
		// create Token
		const token = jwt.sign({ _id: user._id }, process.env.SECRET);

		//put token in cookie
		res.cookie("token", token, { expire: new Date() + 9999 });

		//send response to frontend
		const { _id, name, email, role } = user;
		res.json({
			token,
			user: {
				_id,
				name,
				email,
				role,
			},
		});
	});
};
