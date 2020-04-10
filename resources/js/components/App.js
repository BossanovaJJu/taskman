import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './Header'
import ProjectList from "./ProjectList";


class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Header/>
					<Switch>
						<Route exact path='/' component={ProjectList} />
					</Switch>
				</div>
			</Router>
		)
	}
}
ReactDOM.render(<App />, document.getElementById('app'));
