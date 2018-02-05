'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderItemSchema = new Schema({
	_itemId: {
		type: Schema.Types.ObjectId,
		ref: "item"
	},
	length: {
		type: Number,
		Required: "Order number is required",
		validate: [
			val => val.length > 0, 
			"At least one item is required"
		]
	}
}, {
	collection: "order_item"
});

module.exports = mongoose.model('order_item', OrderItemSchema);