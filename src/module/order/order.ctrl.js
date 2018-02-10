var BaseController = require("../common/BaseController");
var Order = require("./order.ent");

class OrderController extends BaseController {

	constructor(router) {
		super(router, Order);

		this.bind('/order')
			.get(this.get.bind(this))
			.post(this.post.bind(this));

		this.bind('/order/:id')
			.get(this.get.bind(this))
			.put(this.put.bind(this))
			.delete(this.delete.bind(this));
	}
}

module.exports = (router) => new OrderController(router);