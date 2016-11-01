var React = require('react');
var ReactDOM = require('react-dom');

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }

    handleClick() {
        this.setState(prevState => {
            prevState.counter++;
            return prevState;
        });
    }

    render() {
        return <div onClick={this.handleClick.bind(this)}>counter: {this.state.counter}</div>

    }
}

module.exports = Index;

try {
    ReactDOM.render(<Index />, document.getElementById('content'));
} catch (e) {
}