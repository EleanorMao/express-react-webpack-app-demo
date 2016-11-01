var path = require('path');
var express = require('express');
var router = express.Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var ParseEntry = require('../middleware/parsePlugin').parseEntry;
var Entries = ParseEntry(path.join(__dirname, "../source"), {
    ignore: ['lib']
});
var DEV = process.env.NODE_ENV === 'dev';
var Source = {};
var Config = {};
var GetFilePath = function () {
};

if (DEV) {
    GetFilePath = require('../middleware/getFilePathPlugin');
    Config = require('../config/dev.json');
} else {
    Source = require('../server/static.prod.json');
    Config = require('../config/prod.json');
}

/* GET home page. */
router.get('/:file', function (req, res, next) {
    var fileName = req.params.file[0].toUpperCase() + req.params.file.slice(1),
        Menu = require(Entries.Menu),
        Header = require(Entries.Header),
        Model = require(Entries[fileName]),
        status = res.locals.webpackStats || {},
        menuPaths = DEV ? GetFilePath(status, 'Menu') : Source.Menu,
        headerPaths = DEV ? GetFilePath(status, 'Header') : Source.Header,
        commonPaths = DEV ? GetFilePath(status, 'Vendor') : Source.Vendor,
        currentPaths = DEV ? GetFilePath(status, fileName) : Source[fileName],
        scripts = Array.from(commonPaths.js).concat(Array.from(headerPaths.js)).concat(Array.from(currentPaths.js)),
        csses = Array.from(menuPaths.css).concat(Array.from(headerPaths.css)).concat(Array.from(currentPaths.css));
    res.render('index', {
        dev: DEV,
        csses: csses,
        scripts: scripts,
        title: 'HELLO WORLD',
        header: ReactDOMServer.renderToString(<Header />),
        content: ReactDOMServer.renderToString(<Model url={req.url}/>),
        menu: ReactDOMServer.renderToString(<Menu crtSubMenu={`/${fileName}`}/>)
    });
});

module.exports = router;

// '/' next() -> error handlers
// 404 next() -> error handlers