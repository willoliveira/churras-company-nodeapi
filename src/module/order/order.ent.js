'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
	numOrder: {
		type: Number,
		default: 0
	},
	_companyId: {
		type: Schema.Types.ObjectId,
		ref: "company",
		required: [true, "CompanyId is required"]
	},
	_userId: {
		type: Schema.Types.ObjectId,
		ref: "user",
		required: [true, "UserId is required"]
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
			required: [true, "ItemId is required"],
			ref: "item"
		}
	}]
}, {
	collection: "order"
});

module.exports = mongoose.model('order', OrderSchema);