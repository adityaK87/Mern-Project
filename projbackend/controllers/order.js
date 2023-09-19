const { Order, ProductCart } = require("../models/order");

exports.getOrderbyId = (req, res, next, id) => {
	Order.findById(id)
		.populate("products.product", "name price")
		.exec((err, order) => {
			if (err) {
				return res.status(404).json({
					error: "No order found in DB",
				});
			}
			req.order = order;
			next();
		});
};
