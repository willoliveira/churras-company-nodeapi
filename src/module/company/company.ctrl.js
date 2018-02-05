var BaseController = require("../common/BaseController");
var Company = require("./company.ent");
var Order = require("../order/order.ent");

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

		this.bind('/company/:id/order')
			.post(this.postOrder.bind(this))
	}

	postOrder(req, res) {
		var newOrder = new Order({
			_companyId: req.params.id,
			Items: req.body
		});
		newOrder.save((err, entity) => {
			if (err) {
				res.status(500).send(err);
			}
			console.log(entity)
			res.status(200).json({
				content: entity
			});
		});
	}
}

module.exports = (router) => new PetsController(router);