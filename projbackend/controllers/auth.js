exports.signup = (req, res) => {
	res.json({
		message: "sign up route works",
	});
};

exports.signout = (req, res) => {
	res.json({
		message: "user has been signed out",
	});
};
