const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = (env, argv) => ({
	// This is necessary because Figma's 'eval' works differently than normal eval
	devtool: argv.mode === 'production' ? false : 'inline-source-map',

	entry: {
		start_ui: './src/start/start_ui.ts',
		stateval_ui: './src/stateval/stateval_ui.ts',
		dyneval_ui: './src/dyneval/dyneval_ui.ts',
		code: './src/code.ts' // The entry point for your plugin code
	},

	module: {
		rules: [
			// Converts TypeScript code to JavaScript
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					appendTsSuffixTo: [/\.vue$/]
				}
			},

			// Enables including CSS by doing "import './file.css'" in your TypeScript code
			{ test: /\.css$/, loader: [{ loader: 'style-loader' }, { loader: 'css-loader' }] },
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass')
						}
					}
				]
			},

			{
				test: /\.pug$/,
				loader: 'pug-plain-loader'
			},

			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},

			// Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
			{ test: /\.(png|jpg|gif|webp|svg)$/, loader: [{ loader: 'url-loader' }] }
		]
	},

	// Webpack tries these extensions for you if you omit the extension like "import './file'"
	resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist') // Compile into a folder called "dist"
	},

	// Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
	plugins: [
		new VueLoaderPlugin(),
		new RemovePlugin({
			after: { include: [
				'dist/start_ui.js',
				'dist/stateval_ui.js',
				'dist/dyneval_ui.js'
			] }
		}),
		new HtmlWebpackPlugin({
			template: './src/start/start_ui.html',
			filename: 'start_ui.html',
			inlineSource: '.(js)$',
			chunks: ['start_ui'],
		}),
		new HtmlWebpackPlugin({
			template: './src/stateval/stateval_ui.html',
			filename: 'stateval_ui.html',
			inlineSource: '.(js)$',
			chunks: ['stateval_ui'],
		}),
		new HtmlWebpackPlugin({
			template: './src/dyneval/dyneval_ui.html',
			filename: 'dyneval_ui.html',
			inlineSource: '.(js)$',
			chunks: ['dyneval_ui'],
		}),
		new HtmlWebpackInlineSourcePlugin()
	],
});
