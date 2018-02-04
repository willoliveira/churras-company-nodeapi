var BaseController = require("../common/BaseController");
var User = require("./user.ent");

class UsersController extends BaseController {

	constructor(router) {
		super(router, User);

		this.bind('/user')
			.get(this.get.bind(this))
			.post(this.post.bind(this));

		this.bind('/user/:id')
			.get(this.get.bind(this))
			.put(this.put.bind(this))
			.delete(this.delete.bind(this));
	}
}

module.exports = (router) => new UsersController(router);