const BaseController = require("../common/BaseController");
const Company = require("./company.ent");
const Order = require("../order/order.ent");
const mongoose = require("mongoose");
const { loginRequired } = require("../../services/auth/auth.service");

class CompanyController extends BaseController {

	constructor(router) {
		super(router, Company);

		this.bind('/company')
			.get(this.get.bind(this))
			.post(loginRequired, this.post.bind(this));

		this.bind('/company/:id')
			.get(this.get.bind(this))
			.put(loginRequired, this.put.bind(this))
			.delete(loginRequired, this.delete.bind(this));

		this.bind('/company/:id/order')
			.get(loginRequired, this.getCompanyOrders.bind(this))
			.post(loginRequired, this.postOrder.bind(this));

		this.bind('/order/companies')
			.get(loginRequired, this.getCompanyOrders.bind(this));
	}

	post(req, res, next) {
		req.body._userId = req.user._id;
		super.post(req, res);
	}

	postOrder(req, res) {
		var newOrder = new Order({
			_companyId: req.params.id,
			_userId: req.user._id,
			Items: req.body
		});
		
		newOrder.save((err, entity) => {
			if (err) {
				res.status(500).send(err);
			}
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
		this.entity
			.aggregate([
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
							"CNPJ": "$CNPJ",
							"about": "$about"
						},
						"Order": {
							"_id": "$Orders._id",
							"_companyId": "$_id",
							"Items": "$Items",
							"amount": "$Orders.Items.amount",
							"_itemId": "$Orders.Items._itemId",
						}
					}
				},
			]).exec((err, companyOrders) => {

				if (err) res.status(500).send(err);
				
				if (companyOrders && companyOrders.length) {

					let returnCompanyOrders = companyOrders.reduce(function(before, next) {
						let order;
						let index = before.map(c => c.Company._id.toString()).indexOf(next.Company._id.toString());
						if (!before.length || index === -1) {
							before.push({ 
								Company: next.Company,
								Orders: [ ]
							});
							index = before.length - 1
						}
						
						if (next.Order.Items.length) {
							let order = next.Order;
							order.Items = order.Items.map((item, indexItem) => Object.assign(item, {
								amount: order.amount[order._itemId.map(itemId => itemId.toString()).indexOf(item._id.toString())],
							}));

							delete order.amount;
							delete order._itemId;
					
							before[index].Orders.push(order);
						}
						return before;
					}, []);

					if (req && req.params && req.params.id) {
						res.status(200).json({
							content: returnCompanyOrders.find(c => c.Company._id.toString() === req.params.id)
						});
					} else {	
						res.status(200).json({
							content: returnCompanyOrders
						});
					}
				} else {
					res.status(204).json();
				}
			});
	}
}

module.exports = (router) => new CompanyController(router);