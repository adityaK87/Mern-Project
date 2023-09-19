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

exports.createOrder = (req, res) => {
	req.body.order.user = req.profile;
	let order = new Order(req.body.order);
	order.save((err, order) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to save your order in DB",
			});
		}
		ResizeObserver.json(order);
	});
};

exports.getAllOrders = (req, res) => {
	Order.find()
		.populate("user", "_id name")
		.exec((err, orders) => {
			if (err) {
				return res.status(400).json({
					error: "No orders found in DB",
				});
			}
			res.json(orders);
		});
};
