var BaseController = require("../common/BaseController");
var Company = require("./company.ent");

class PetsController extends BaseController{

	constructor(router) {
		super(router, Company);

		this.bind('/company')
			.get(this.get.bind(this))
			.post(this.post.bind(this));

		this.bind('/company/:id')
			.get(this.get.bind(this))
			.put(this.put.bind(this))
			.delete(this.delete.bind(this));
	}
}

module.exports = (router) => new PetsController(router);