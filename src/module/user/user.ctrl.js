const BaseController = require("../common/BaseController");
const User = require("./user.ent");
const bcrypt = require("bcrypt");
const { loginRequired } = require("../../services/auth/auth.service");

class UsersController extends BaseController {

	constructor(router) {
		super(router, User);

		this.bind('/user')
			.get(loginRequired, this.get.bind(this))
			.put(loginRequired, this.put.bind(this));
			// .post(this.post.bind(this));
			
		this.bind('/user/:id')
			.get(loginRequired, this.get.bind(this))
			.delete(loginRequired, this.delete.bind(this));
	}

	put(req, res) {
		const body = Object.assign({}, req.user, req.body);
		body.hash_password = bcrypt.hashSync(req.body.password, 10);
		
		this.entity.findOneAndUpdate({ _id: req.user._id }, body, (err, entity) => {
			if (err) res.status(500).send(err);

			entity.hash_password = undefined;
			res.status(200).json(entity);
		});
	}
}

module.exports = (router) => new UsersController(router);