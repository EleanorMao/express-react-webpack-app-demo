var React = require('react');
require('../public/stylesheets/style.css');

module.exports = React.createClass({
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
