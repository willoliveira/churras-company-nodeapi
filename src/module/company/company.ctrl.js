var BaseController = require("../common/BaseController");
var Company = require("./company.ent");
var Order = require("../order/order.ent");

class CompanyController extends BaseController{

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
			.get(this.getCompanyOrders.bind(this))
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

	getCompanyOrders(req, res) {
		this.entity
			.aggregate([
				{
					$lookup: {
						from: 'order',
						localField: '_id',
						foreignField: '_companyId',
						as: "Orders"
					}
				}
			]).exec((err, companyOrders) => {
				console.log(companyOrders);
				res.json(companyOrders);
				
				// if (err) res.status(500).send(err);
				// companyOrders.length ? 
				// 	res.json(companyOrders[0]) :
				// 	res.json(companyOrders);
			});
	}
}

module.exports = (router) => new CompanyController(router);