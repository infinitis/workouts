const path = require('path');
const webpack = require('webpack');

module.exports = {
	target:'web',
	entry:'./src/index.js',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader:	'css-loader',
						options: {
							modules: true
						}
					}
				],
			}
		]
	},
	devServer: {
		disableHostCheck: true
	},
	plugins:[
		new webpack.ProvidePlugin({
			React:'react',
			createElement:['react','createElement']
		})
	],
	resolve: {
		modules:[
			path.resolve('./src'),
			path.resolve('./node_modules')
		]
	}
};