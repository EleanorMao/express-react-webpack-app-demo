var express = require('express');
var router = express.Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Index = require('../source/Index');
var Test = require('../source/Test');
var data = require('../server/fileName.json');

/* GET home page. */
router.get('/', function(req, res, next) {
	var html = ReactDOMServer.renderToString(<Index />);
    var test = '123';
  	res.render('index', {title: '阿毛喵喵',content: html,test: test, scripts: data.main.js, csses: data.main.css});
});

router.get('/test', function(req, res, next) {
    var html =123;
    var test = ReactDOMServer.renderToString(<Test />);
    res.render('index', {content: html, test: test});
});

module.exports = router;

// '/' next() -> error handlers
// 404 next() -> error handlers