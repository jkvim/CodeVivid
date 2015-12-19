var path = require('path');
var webpack = require('webpack');
var ExtraTextPlugin = require('extract-text-webpack-plugin');

module.exports = [{
	name: 'browser',
	target: 'web',
	entry: { 
		bundle: path.resolve(__dirname, './public/src/js/browser.js'),
		common: ['react', 'react-dom', 'gravatar']
	},
	output: {
		path: path.resolve(__dirname, './public/build/js'),
		publicPath: '/js/',
		filename: '[name].js',
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					presets: ['react', 'es2015', 'stage-2']
				}
			},
			{
				test: /\.css$/,
				loader: ExtraTextPlugin.extract('style-loader', 'css-loader')
			},
			{
				test: /\.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
				loader: 'url-loader?limit=100000'
			}
		],
	},
	// devtool: '#inline-source-map',
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false ,
			// mangle: false,
		  }),
		new ExtraTextPlugin('../css/[name].css'),
	],
	externals: {
		moment: 'moment',
		lodash: '_',
	},
}, 
{
	name: 'node',
	target: 'node',
	entry: [ path.resolve(__dirname, './public/src/js/component/index.jsx') ],
	output: {
		path: path.resolve(__dirname, './'),
		filename: './build/bundle.js',
		libraryTarget: 'commonjs2'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					presets: ['react', 'es2015', 'stage-2']
				}
			},
		],
		noParse: [/moment-with-locales/]
	},
	devtool: '#inline-source-map',
	resolve: {
		alias: {
			'moment': 'moment/min/moment-with-locales.min.js',
		}
	}
}]
