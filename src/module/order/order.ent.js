'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
	_companyId: {
		type: Schema.Types.ObjectId,
		ref: "company",
		Required: "order's email is required"
	},
	Items: [{
		type: Schema.Types.ObjectId,
		Required: "order's name is required",
		ref: "order_item",		
		validate: [
			val => val.length > 0,
			"At least one item is required"
		]
	}]
}, {
	collection: "order"
});

module.exports = mongoose.model('order', OrderSchema);