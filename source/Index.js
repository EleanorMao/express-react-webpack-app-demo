var React = require('react');
var ReactDOM = require('react-dom');
require('../public/stylesheets/style.css');

var Index = React.createClass({
	getInitialState: function getInitialState() {
    	return { counter: 0 };
  	},
  handleClick: function(){
    this.setState(prevState =>{
      prevState.counter++;
      return prevState;
    });
  },
	render: function(){
		return <div onClick={this.handleClick}>counter: {this.state.counter}</div>
	}
})

module.exports = Index;

try{
  ReactDOM.render(<Index />, document.getElementById('content'));
}catch(e){}