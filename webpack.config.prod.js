var path = require('path');
var webpack = require('webpack');
var entryPath = path.join(__dirname, 'client');
var outputPath = path.join(__dirname, 'public');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var getFileNamePlugin = require("./lib/getFileNamePlugin");

module.exports =
{   name: 'client',
    entry: {
        main: path.join(entryPath, 'main.js')
    },
    output:{
        path: outputPath,
        filename: 'javascripts/client/[name].[hash].js',
    },
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
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("stylesheets/style.[hash].css", {
            allChunks: true
        }),
        getFileNamePlugin
    ]
}