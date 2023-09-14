const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
	Category.findById(id).exec((err, category) => {
		if (err) {
			return res.status(400).json({
				error: "Category not found in DB",
			});
		}
		req.category = category;
	});
	next();
};

exports.createCategory = (req, res) => {
	let category = new Category(req.body);
	category.save((err, category) => {
		if (err) {
			return res.status(400).json({
				error: "NOT able to save category in DB",
			});
		}
		res.json({
			category,
		});
	});
};

exports.getCategory = (req, res) => {
	return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
	Category.find().exec((error, categories) => {
		if (error) {
			return res.status(400).json({ error: "NO categories found" });
		}
		res.json(categories);
	});
};
