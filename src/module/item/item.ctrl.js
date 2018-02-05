var BaseController = require("../common/BaseController");
var User = require("./item.ent");

class ItemController extends BaseController {

	constructor(router) {
		super(router, User);

		this.bind('/item')
			.get(this.get.bind(this))
			.post(this.post.bind(this));

		this.bind('/item/:id')
			.get(this.get.bind(this))
			.put(this.put.bind(this))
			.delete(this.delete.bind(this));
	}
}

module.exports = (router) => new ItemController(router);