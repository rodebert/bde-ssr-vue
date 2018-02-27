const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


module.exports = {
	devtool: '#cheap-module-source-map',
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/dist/',
		filename: '[name].[chunkhash].js'
	},
	resolve: {
		alias: {
			'public': path.resolve(__dirname, '../public')
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueConfig,
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[name].[ext]?[hash]',
				},
			},
			{
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader'],
			}
		]
	},
	performance: {
		maxEntrypointSize: 300000,
		hints: false,
	},
	plugins: [ new FriendlyErrorsPlugin()]
}
