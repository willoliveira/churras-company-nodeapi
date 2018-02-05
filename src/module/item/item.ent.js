'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TYPE_ITEMS = [
	"beer",
	"coal",
	'garlic_bread',
	'soda',
	'napkin',
	'alcohol',
	'barbecue_grill'
]

var ItemSchema = new Schema({
	name: {
		type: String,
		Required: "Name item is required"
	},
	type: {
		type: String,
		enum: TYPE_ITEMS,
		Required: "Type is required"
	}
}, {
	collection: "item"
});

module.exports = mongoose.model('item', ItemSchema);