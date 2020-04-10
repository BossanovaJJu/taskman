import React, { Component } from 'react';
import Axios from 'axios';

class NewProject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			errors: []
		}
	}
	handleFieldChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleCreateNewProject = event => {
		event.preventDefault();
		const { history } = this.props;
		const project = {
			name: this.state.name,
			description: this.state.descent
		}
		Axios.post('/api/projects', project)
			.then(response => {
				//redirect to the homepage
				history.push('/')
			})
			.catch(error => {
				this.setState({
					errors: error.response.data.erros
				})
			})
	}
	render() {
		return(

		)
	}

	export default NewProject;
