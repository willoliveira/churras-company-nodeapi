var BaseController = require("../common/BaseController");
var Order = require("./order.ent");
const { loginRequired } = require("../../services/auth/auth.service");

class OrderController extends BaseController {

	constructor(router) {
		super(router, Order);

		this.bind('/order')
			.get(loginRequired, this.get.bind(this))
			.post(loginRequired, this.post.bind(this));

		this.bind('/order/:id')
			.get(loginRequired, this.get.bind(this))
			.put(loginRequired, this.put.bind(this))
			.delete(loginRequired, this.delete.bind(this));
	}
}

module.exports = (router) => new OrderController(router);