require("dotenv").config();
const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

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

exports.signin = (req, res) => {
	const { email, password } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({
			error: errors.array()[0].msg,
		});
	}

	User.findOne({ email }, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "USER email does not exist",
			});
		}
		if (!user.authenticate(password)) {
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

exports.signout = (req, res) => {
	res.clearCookie("token"); // we are doing this by using cookieParser middleware
	res.json({
		message: "User signout successfully",
	});
};

//Protected Routes
exports.isSignedIn = expressJwt({
	secret: process.env.SECRET,
	userProperty: "auth", //req
});

//Custom Middlewares
exports.isAuthenticated = (req, res, next) => {
	let checker = req.profile && req.auth && req.profile._id == req.auth._id; //req.profile is coming from frontend
	if (!checker) {
		return res.status(403).json({
			error: "ACCESS DENIED",
		});
	}
	next();
};

exports.isAdmin = (req, res, next) => {
	if (req.profile.role === 0) {
		return res.status(403).json({
			error: "You are Not ADMIN, Access denied",
		});
	}
	next();
};
