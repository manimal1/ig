'use strict';

const SETTINGS = {
	INPUT : process.cwd() + '/src',
	OUTPUT : process.env.OUTPUT_FOLDER || './public',
	ENV : process.env.NODE_ENV || 'development'
};

const webpack = require( 'webpack' );

const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const LiveReloadPlugin = require( 'webpack-livereload-plugin' );
const AssetsPlugin = require( 'assets-webpack-plugin' );

const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const rimraf = require( 'rimraf' );
const autoprefixer = require( 'autoprefixer' );


console.log( SETTINGS.OUTPUT );
/**
 * Development webpack configuration - use suits-core for testing with sandbox
 */
module.exports = {
	// bail: true,

	context: SETTINGS.INPUT,

	devtool: SETTINGS.ENV === 'production' ? null :'inline-source-map',

	resolve: {
		extensions: ['', '.js', '.scss', '.css', '.pug']
	},

	node: {
		fs: "empty"
	},

	entry: {
		main : './styles/main.scss',
		bundle : './javascript/bundle'
	},

	output: {
		path: SETTINGS.OUTPUT,
		publicPath: '',
		filename: addHash( '[name].js', 'chunkhash' ),
		chunkFilename: addHash( '[id].js', 'chunkhash' ),
		library: '[name]'
	},
	module: {
		loaders: [
			// Styles
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract( 'css' )
			},
			{
				test: /\.scss$/,
				exclude: [/node_modules/],
				loader: ExtractTextPlugin.extract( 'css!postcss!sass?resolve url' )
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.html/,
				exclude: [/node_modules/],
				loaders: ['html-loader']
			},
			{
				test: /\.pug/,
				exclude: [/node_modules/],
				loaders: ['pug-loader?exports=false']
			}
			// Images
			// {
			// 	test: /\.(gif|png|jpg|cur)$/,
			// 	loader: addHash( 'file?name=[name].[ext]', 'hash:6' )
			// },
			// { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
			// { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
			// Javascript
			// {
			// 	test: /(\.jsx|\.js)$/,
			// 	loader: 'babel-loader',
			// 	query: {
			// 		presets: ['babel-preset-react', 'babel-preset-es2015']
			// 	}
			// }
			]
	},
	postcss: [
		autoprefixer( {
			browsers: ['last 12 versions']
		} )
	],

	plugins: [
		new webpack.NoErrorsPlugin(),
		// new webpack.optimize.CommonsChunkPlugin(
		// {
		// 	name: 'common'
		// } ),
	new ExtractTextPlugin( addHash( '[name].css', 'contenthash' ) ),
	new CleanWebpackPlugin( [SETTINGS.OUTPUT] ),
	new AssetsPlugin( {
		filename: '/assetsMap.json',
		path: SETTINGS.OUTPUT + '/meta',
		prettyPrint: true
	} )
]
};

/**
 * Live Reload for watch dev mode
 */
if ( SETTINGS.ENV === 'development' ) {
	module.exports.plugins.push( new LiveReloadPlugin( { appendScriptTag: true } ) );
}

/**
 * Uglifies Production Assets
 */
if ( SETTINGS.ENV === 'production' ) {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin( {
			compress: {
				// don't show unreachable variables etc
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		} )
	);
}

function addHash( template, hash ) {
	return SETTINGS.ENV === 'production' ? template.replace( /\.[^.]+$/, `.[${hash}]$&` ) :`${template}?hash=[${hash}]`;
}
