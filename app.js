require('node-jsx').install(); //enable use jsx in express
require('./lib/ignore').install('.css'); //ignore css

var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// set env
var env = process.env.NODE_ENV || '';
app.set('env', env);
app.locals.env = env;

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


if(app.get('env') === 'dev'){

  var webpack = require('webpack'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware'),
      webpackDevConfig = require('./webpack.config.dev.js');

  var compiler = webpack(webpackDevConfig);

  app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackDevConfig.output.publicPath,
      noInfo: true,
      hot: true,
      stats: {
          colors: true
      }
  }));

  app.use(webpackHotMiddleware(compiler));

}else{

  app.use(express.static(path.join(__dirname, 'public'))); //production use static

}

app.use('/', routes);


module.exports = app;
