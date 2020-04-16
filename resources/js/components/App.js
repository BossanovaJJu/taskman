import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './Header'
import ProjectList from "./ProjectList";
import NewProject from "./NewProject";
import SingleProject from "./SingleProject";


class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Header/>
					<Switch>
						<Route exact path='/' component={ProjectList} />
						<Route path='/create' component={NewProject} />
						<Route path='/:id' component={SingleProject} />
					</Switch>
				</div>
			</Router>
		)
	}
}
ReactDOM.render(<App />, document.getElementById('app'));
