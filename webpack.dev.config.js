var path = require('path');

module.exports = {
	// entry: ['webpack-dev-server/client?http://localhost:8080',
	// 				'webpack/hot/dev-server', 
	// 	path.resolve(__dirname, './public/js/browser.js')],

	// dev static page
	entry: ['webpack/hot/dev-server', 
		path.resolve(__dirname, './client.js')],
	output: {
		path: path.resolve(__dirname, './public/'),
		filename: '/bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'react-hot',
				exclude: /node_modules/,
			},
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					presets: ['stage-2', 'react','es2015']
				}
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.jade$/,
				loader: 'jade-html'
			}
		]
	},
	// devServer: {
	// 	proxy: {
	// 		'*' : 'http://localhost:3000'
	// 	}
	// }
}
