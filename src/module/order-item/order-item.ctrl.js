var BaseController = require("../common/BaseController");
var User = require("./order-item.ent");

class OrderItemController extends BaseController {

	constructor(router) {
		super(router, User);

		this.bind('/order-item')
			.get(this.get.bind(this))
			.post(this.post.bind(this));

		this.bind('/order-item/:id')
			.get(this.get.bind(this))
			.put(this.put.bind(this))
			.delete(this.delete.bind(this));
	}
}

module.exports = (router) => new OrderItemController(router);