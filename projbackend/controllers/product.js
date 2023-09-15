const Product = require("../models/product");

exports.getProductById = (req, res, next, id) => {
	Product.findById(id)
		.populate("category")
		.exec((err, product) => {
			if (err) {
				res.status(400).json({
					Error: "PRODUCT is not found",
				});
			}
			req.product = product;
			next();
		});
};
