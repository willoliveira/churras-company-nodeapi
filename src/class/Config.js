//TODO: implementar isso depois
// const Resource = require('config')

class Config {
	
	static get port () {
		return 3000;
	}
	
	static get database () {
		return 'mongodb://localhost:27017/churras';
	}

	static get allowOrigin () {
		return '*';
	}

	static get env () {
		return process.env.NODE_ENV || 'development';
	}
}

module.exports = Config;