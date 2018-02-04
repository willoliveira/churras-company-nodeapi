'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {
		type: String,
		Required: "User's email is required"
	},
	name: {
		type: String,
		Required: "User's name is required"
	}
}, {
	collection: "user"
});

module.exports = mongoose.model('User', UserSchema);