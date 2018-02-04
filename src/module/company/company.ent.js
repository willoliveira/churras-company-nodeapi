'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
	_userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	socialName: {
		type: String,
		required: true
	},
	nameFantasy: {
		type: String,
		required: true
	},
	about: {
		type: String,
		required: true
	},
	createDate: {
		type: Date,
		required: true,
		default: Date.now
	}
}, {
	collection: "company"
});

module.exports = mongoose.model('Company', CompanySchema);