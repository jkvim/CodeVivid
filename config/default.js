var path = require('path');
var MONGO_HOST = process.env.MONGO_HOST || '127.0.0.1';
var MONGO_PORT = process.env.MONGO_PORT || '27017';


module.exports = {
	port: process.env.PORT || 3001,
	mongodb: {
    url: 'mongodb://' + MONGO_HOST + ':' + MONGO_PORT + '/vivid'
	},
  embedKey: process.env.KEY || '',
	schemeConf: path.join(__dirname, './default.scheme'),
	staticPath: path.join(__dirname, '../public/build'),
	staticOption: {
		// maxAge: 24 * 60 * 60 * 6,
	},
};
