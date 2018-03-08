const { THEME } = process.env;

module.exports = {
	extractCSS: process.env.NODE_ENV === 'production',
	preserveWhitespace: false,
	postcss: [
		require('autoprefixer')({
		browsers: ['last 3 versions']
	})],
	loaders: {
		scss: [
			{ loader: 'vue-style-loader' },
			{ loader: 'css-loader' },
			{
				loader: 'sass-loader',
				options: {
					data: `$theme: '${THEME}';`
				}
			}
		]
	}
}
