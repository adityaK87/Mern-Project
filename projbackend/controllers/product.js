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

exports.getProduct = (req, res) => {
	req.product.photo = undefined;
	return res.json(req.product);
};

//middleware
exports.photo = (req, res, next) => {
	if (req.product.photo) {
		res.set("Content-Type", req.product.photo.contentType);
		return res.send(req.product.photo.data);
	}
	next();
};

exports.deleteProduct = (req, res) => {
	let product = req.product;

	product.remove((err, deletedProduct) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to delete the product",
			});
		}
		res.json({
			error: "Deletion of the product Successfully",
			deletedProduct,
		});
	});
};

exports.updateProduct = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, file) => {
		if (err) {
			res.status(400).json({
				error: "Problem with the image",
			});
		}

		//updation code
		let product = req.product;
		product = _.extend(product, fields);

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
					error: "updation of product failed",
				});
			}
			res.json(product);
		});
	});
};

//product listing
exports.getAllProducts = (req, res) => {
	let limit = req.query.limit ? parseInt(req.query.limit) : 8;
	let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

	Product.find()
		.select("-photo") //don't select photo of the product -
		.populate("category")
		.sort([[sortBy, "asc"]])
		.limit(limit)
		.exec((err, products) => {
			if (err) {
				return res.status(400).json({
					error: "NO product found",
				});
			}
			res.json(products);
		});
};
