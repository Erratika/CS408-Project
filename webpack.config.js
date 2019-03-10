module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				include: /node_modules/,
				loaders: ['style-loader', 'css-loader'],
			}
		]
	}
};