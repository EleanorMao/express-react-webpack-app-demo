var express = require('express');
var router = express.Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Index = require('../source/Index');
var Test = require('../source/Test');
if(process.env.NODE_ENV === 'env'){
    var data = require('../server/static.dev.json');
}else{
    var data = require('../server/static.prod.json');
}

/* GET home page. */
router.get('/', function(req, res, next) {
	var html = ReactDOMServer.renderToString(<Index />);
    var test = '123';
  	res.render('index', {title: '阿毛喵喵',content: html,test: test, scripts: data.index.js, csses: data.index.css});
});

router.get('/test', function(req, res, next) {
    var html =123;
    var test = ReactDOMServer.renderToString(<Test />);
    res.render('index', {title: '阿毛喵喵', content: html, test: test, scripts: data.test.js, csses: data.test.css});
});

module.exports = router;

// '/' next() -> error handlers
// 404 next() -> error handlers