var path = require('path');
var webpack = require('webpack');
var outputPath = path.join(__dirname, 'public', 'assets');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ParseEntry = require('./middleware/ParsePlugin').parseEntry;
var Entries = ParseEntry(path.join(__dirname, "source"), {
    ignore: ['lib']
});

module.exports = {
    name: 'client',
    entry: Object.assign({Vendor: ['react', 'react-dom']}, Entries),
    output: {
        path: outputPath,
        filename: '[name].[hash].js',
        publicPath: '/assets'
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react'),
            'react-dom': path.join(__dirname, 'node_modules', 'react-dom')
        }
    },
    module: {
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
                test: /\.(less|css)?$/,
                loader: ExtractTextPlugin.extract(['css', 'less'])
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('Vendor', 'Vendor.[hash].js'),
        new ExtractTextPlugin("[name].[hash].css", {
            allChunks: true
        })
    ]
}