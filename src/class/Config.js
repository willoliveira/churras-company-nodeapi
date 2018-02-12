//TODO: implementar isso depois
// const Resource = require('config')

class Config {
	
	static get port () {
		return process.env.PORT || 3000;
	}
	
	static get database () {
		return process.env.MONGODB_URI || 'mongodb://localhost:27017/churras';
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