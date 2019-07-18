const withCSS = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript')
const withSass = require('@zeit/next-sass')
const path = require('path')

module.exports = withTypescript(
	withSass(
		withCSS({
			// cssModules: true,
			// cssLoaderOptions: {
			// 	importLoaders: 1,
			// 	localIdentName: '[local]___[hash:base64:5]',
			// },
			useFileSystemPublicRoutes: false,
			webpack(config, options) {
				config.resolve.alias['components'] = path.join(__dirname, 'components')
				config.resolve.alias['styles'] = path.join(__dirname, 'styles')
				return config
			},
		})
	)
)
