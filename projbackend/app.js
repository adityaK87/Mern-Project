require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("DB CONNECTED");
	});

app.get("/", (req, res) => {
	res.status(200).send(`<h2>NAMASTE WORLD</h2>`);
});
const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`app is running at ${port}`);
});
