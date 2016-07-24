var path = require('path');
var webpack = require('webpack');
var entryPath = path.join(__dirname, 'source');
var outputPath = path.join(__dirname, 'public');
var filePath = path.join(__dirname, 'server');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var GetFileNamePlugin = require("./middleware/getFileNamePlugin");

module.exports =
{   name: 'client',
    entry: {
        index: path.join(entryPath, 'Index.js'),
        test: path.join(entryPath, 'Test.js')
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
        new ExtractTextPlugin("stylesheets/[name].[hash].css", {
            allChunks: true
        }),
        new GetFileNamePlugin({fileName: 'static.prod.json', filePath: filePath})
    ]
}