var path = require('path');
var webpack = require('webpack');
var entryPath = path.join(__dirname, 'client');
var outputPath = path.join(__dirname, 'public', 'javascripts', 'client');
var publicPath = 'http://localhost:' + (process.env.PORT || 3000);
var hotMiddlewareScript = 'webpack-hot-middleware/client?' + publicPath;
var hotDevServer = 'webpack/hot/dev-server';
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var getFileNamePlugin = require("./lib/getFileNamePlugin");

module.exports =
{  name: 'client',
    entry: {
        main: [path.join(entryPath, 'main.js'), hotDevServer, hotMiddlewareScript]
    },
	output:{
		path: outputPath,
		filename: 'javascripts/client/[name].[hash].js',
		publicPath: '/'
	},
    devtool: 'source-map',
	module:{
		loaders: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                	presets: ['es2015', 'react']
				}
            }
            , {
                test: /\.css?$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?source-map")
            }
        ]
	},
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("stylesheets/style.[hash].css", {
            allChunks: true
        }),
        getFileNamePlugin
    ]
}