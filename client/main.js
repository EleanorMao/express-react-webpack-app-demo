var React = require('react');
var ReactDOM = require('react-dom');
var Index = React.createElement(require('../source/Index.js'));
var content = document.getElementById('content');

if(content){
	ReactDOM.render(Index, content);
}