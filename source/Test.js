var React = require('react');
var ReactDOM = require('react-dom');
require('../public/stylesheets/style.css');
var Test = React.createClass({
	render: function(){
		return <div>12sds3</div>
	}
})

module.exports  = Test
try{
  ReactDOM.render(<Test />, document.getElementById('content'));
}catch(e){}