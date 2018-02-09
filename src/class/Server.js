var express = require('express');
var CORS = require('cors');
var Config = require('./Config');
var Module = require('../module');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

const jwt = require("jsonwebtoken");

module.exports.run = () => {
	// TODO: Set in config
	app.use(CORS({
		'origin': ['*', "http://localhost:8100"],
		'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
	}));
	
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	
	app.use((req, res, next) => {
		if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
			jwt.verify(req.headers.authorization.split(' ')[1], Config.secretKey, (err, decode) => {
				if (err) {
					req.user = undefined;
				}
				req.user = decode;
				next();
			});
		} else {
			req.user = undefined;
			next();
		}
	});
	
	app.use('/api/v1', router);
	
	Module(router);
	
	app.listen(Config.port);

	console.log(`Server listening on ${Config.port}`);
}