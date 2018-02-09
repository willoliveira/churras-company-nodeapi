'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
	_companyId: {
		type: Schema.Types.ObjectId,
		ref: "company",
		Required: "CompanyId is required"
	},
	_userId: {
		type: Schema.Types.ObjectId,
		ref: "user",
		Required: "UserId is required"
	},
	Items: [{
		amount: {
			type: Number,
			validate: [
				val => val > 0,
				"At least one item is required"
			]
		},
		_itemId: {
			type: Schema.Types.ObjectId,
			Required: "ItemId is required",
			ref: "item"
		}
	}]
}, {
	collection: "order"
});

module.exports = mongoose.model('order', OrderSchema);