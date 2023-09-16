const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

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

exports.createProduct = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, file) => {
		if (err) {
			res.status(400).json({
				error: "Problem with the image",
			});
		}

		//destructure the fields
		const { name, description, price, category, stock } = fields;
		if (!name || !description || !price || !category || !stock) {
			return res.status(404).json({
				error: "PLease include all fields",
			});
		}

		let product = new Product(fields);

		//handle files here
		if (file.photo) {
			if (file.photo.size > 3 * 1024 * 1024) {
				return res.status(400).json({
					error: "File size too big!",
				});
			}
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}

		product.save((err, product) => {
			if (err) {
				return res.status(400).json({
					error: "Saving Tshirt in DB failed",
				});
			}
			res.json(product);
		});
	});
};
