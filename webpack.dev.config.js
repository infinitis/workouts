const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

module.exports = merge(baseConfig,{
	mode:'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './'
	},
	output: {
		filename: 'workouts.js',
		path: path.resolve(__dirname,'./')
	}
});