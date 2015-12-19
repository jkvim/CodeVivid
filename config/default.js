var path = require('path');

module.exports = {
	port: process.env.PORT || 3001,
	mongodb: {
		url: 'mongodb://127.0.0.1:27017/vivid'
	},
	schemeConf: path.join(__dirname, './default.scheme'),
	staticPath: path.join(__dirname, '../public/build'),
	staticOption: {
		// maxAge: 24 * 60 * 60 * 6,
	},
};
