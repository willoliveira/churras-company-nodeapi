//TODO: implementar isso depois
// const Resource = require('config')

class Config {
	
	static get port () {
		return 3000;
	}
	
	static get database () {
		return 'mongodb://willoliveira:Will1704@ds231758.mlab.com:31758/churras-mdb';
	}

	static get allowOrigin () {
		return '*';
	}

	static get env () {
		return process.env.NODE_ENV || 'development';
	}

	static get secretKey() {
		return "SECRET-KEY";
	}
}

module.exports = Config;