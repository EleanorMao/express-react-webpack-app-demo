var path = require('path');
var webpack = require('webpack');
var outputPath = path.join(__dirname, 'public', 'assets');
var filePath = path.join(__dirname, 'server');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var GetFileNamePlugin = require("./middleware/getFileNamePlugin");
var ParseEntry = require('./middleware/ParsePlugin').parseEntry;
var Entries = ParseEntry(path.join(__dirname, "source"), {
    ignore: ['lib']
});

module.exports =
{
    name: 'client',
    entry: Object.assign({Vendor: ['react', 'react-dom']}, Entries),
    output: {
        path: outputPath,
        filename: '[name].[hash].js',
        publicPath: '/assets'
    },
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
        new ExtractTextPlugin("stylesheets/[name].[hash].css", {
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin('Vendor', 'Vendor.[hash].js'),
        new GetFileNamePlugin({
            fileName: 'static.prod.json',
            publicPath: 'assets/',
            filePath: filePath
        })
    ]
}