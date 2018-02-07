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

	/**
	 * https://stackoverflow.com/questions/36019713/mongodb-nested-lookup-with-3-levels
	 * @param {*} req 
	 * @param {*} res 
	 */
	getCompanyOrders(req, res) {
		console.log(req.params.id)
		this.entity
			.aggregate([
				// { $match : { '_id': '5a77a00e5ff3481cf4d2d01c' } },
				// { $group : { '_id' : '_id' } },
				{
					$lookup: {
						from: 'order',
						localField: '_id',
						foreignField: '_companyId',
						as: "Orders"
					}
				},
				{
					$unwind: {
						path: "$Orders",
						preserveNullAndEmptyArrays: true
					}
				},
				{
					$lookup: {
						from: 'item',
						localField: 'Orders.Items._itemId',
						foreignField: '_id',
						as: "Items"
					}
				},
				{
					$project: {
						_id: "$_id",
						Company: {
							"_id": "$_id",
							"createDate": "$createDate",
							"_userId": "$_userId",
							"socialName": "$socialName",
							"nameFantasy": "$nameFantasy",
							"about": "$about"
						},
						"Order": {
							"_id": "$Orders._id",
							"Items": "$Items",
							"amount": "$Orders.Items.amount"
						},
					}
				},
			]).exec((err, companyOrders) => {
				// res.status(200).json(companyOrders);
				
				if (err) res.status(500).send(err);

				if (companyOrders.length) {	
					companyOrders.forEach((companyOrder) => {
						let order = companyOrder.Order;
						order.Items = order.Items.map((item, index) => Object.assign(item, {
							amount: order.amount[index],
						}));
						delete order.amount;
					});
					
					let returnObj = { 
						Company: companyOrders[0].Company,
						Orders: companyOrders.reduce((CompanyOrderBefore, CompanyOrderActual) => {
							CompanyOrderBefore.push(CompanyOrderActual.Order)
							return CompanyOrderBefore
						}, [])
					}

					res.status(200).json(returnObj);
				} else {
					res.status(204).json();
				}
			});
	}
}

module.exports = (router) => new CompanyController(router);