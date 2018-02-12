var BaseController = require("../common/BaseController");
var User = require("./item.ent");

const { loginRequired } = require("../../services/auth/auth.service");


class ItemController extends BaseController {

	constructor(router) {
		super(router, User);

		this.bind('/item')
			.get(loginRequired, this.get.bind(this))
			.post(loginRequired, this.post.bind(this));

		this.bind('/item/:id')
			.get(loginRequired, this.get.bind(this))
			.put(loginRequired, this.put.bind(this))
			.delete(loginRequired, this.delete.bind(this));
	}
}

module.exports = (router) => new ItemController(router);