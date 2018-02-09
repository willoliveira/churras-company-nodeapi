const BaseController = require("../../module/common/BaseController");
const User = require("../../module/user/user.ent");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Config = require("../../class/Config");

class AuthController extends BaseController {

	constructor(router) {
		super(router, User);

		this.bind('/auth/signup')
			.post(this.signup.bind(this));


		this.bind('/auth/signin')
			.post(this.signin.bind(this));
	}

	signup(req, res) {
		const newUser = this.entity(req.body);
		newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
		newUser.save((err, user) => {
			if (err) res.status(500).send(err);

			user.hash_password = undefined;
			res.status(201).json(user);
		});
	}

	signin(req, res) {
		this.entity.findOne({
			email: req.body.email
		}, (err, user) => {
			if (err) res.status(500).send(err);
			if (!user) {
				res.status(401).json({
					message:  new Error("Password or user wrong.").message 
				});
			} else if(user.comparePassword(req.body.password, user.hash_password)) {
				res.json({
					content: {
						token: jwt.sign({
							_id: user._id,
							email: user.email,
							name: user.name
						}, Config.secretKey)
					}
				});
			} else {
				res.status(401).json({ 
					message:  new Error("Password or user wrong.").message
				});
			}
		})
	}
}


module.exports = (router) => new AuthController(router);
