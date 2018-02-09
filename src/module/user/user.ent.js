'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
	email: {
		type: String,
		Required: "User's email is required",
		unique: true,
		lowercase: true,
		trim: true
	},
	name: {
		type: String,
		Required: "User's name is required"
	},
	hash_password: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
}, {
	collection: "user"
});

UserSchema.methods.comparePassword = function(password, hash_password) {
	return bcrypt.compareSync(password, this.hash_password);
}

module.exports = mongoose.model('User', UserSchema);