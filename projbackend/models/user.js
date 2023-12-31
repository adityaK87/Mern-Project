const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { createHmac } = require("node:crypto");
const uuid4 = require("uuid/v4");

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 32,
			trim: true,
		},
		lastname: {
			type: String,
			maxlength: 32,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		userinfo: {
			type: String,
			trim: true,
		},
		encry_password: {
			type: String,
			required: true,
		},
		salt: String,
		role: {
			type: Number,
			default: 0,
		},
		purchases: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

userSchema
	.virtual("password")
	.set(function (password) {
		this._password = password;
		this.salt = uuid4();
		this.encry_password = this.securePassword(password);
	})
	.get(function () {
		return this._password;
	});

userSchema.methods = {
	authenticate: function (plainPassword) {
		return this.securePassword(plainPassword) === this.encry_password;
	},
	securePassword: function (plainPassword) {
		if (!plainPassword) return "";
		try {
			// https://nodejs.org/api/crypto.html
			return createHmac("sha256", this.salt)
				.update(plainPassword)
				.digest("hex");
		} catch (error) {
			return "";
		}
	},
};

module.exports = mongoose.model("User", userSchema);
