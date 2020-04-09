import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './Header'


class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Header/>
				</div>
			</Router>
		)
	}
}
ReactDOM.render(<App />, document.getElementById('app'));
