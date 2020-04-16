import React, {Component} from 'react';
import Axios from 'axios';

class NewProject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
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
		const {history} = this.props;
		const project = {
			title: this.state.title,
			description: this.state.description
		}

		Axios.post('/api/projects', project)
			.then(response => {
				//redirect to the homepage
				history.push('/')
			})
			.catch(error => {
				this.setState({
					errors: error.response.data.errors
				})
			})
	}

	hasErrorFor = field => {
		return !!this.state.errors[field];
	}

	renderErrorFor = field => {
		if (this.hasErrorFor(field)) {
			return (
				<span className='invalid-feedback'>
					<strong>{this.state.errors[field][0]}</strong>
				</span>
			)
		}
	}

	render() {
		return (
			<div className='container py-4'>
				<div className='row justify-content-center'>
					<div className='col-md-6'>
						<div className='card'>
							<div className='card-header'>Create new Project</div>
							<div className='card-body'>
								<form onSubmit={this.handleCreateNewProject}>
									<div className='form-group'>
										<label htmlFor='title'>Project title</label>
										<input
											id='title'
											type='text'
											className={`form-control ${this.renderErrorFor('title') ? 'is-invalid' : ''}`}
											name='title'
											value={this.state.title}
											onChange={this.handleFieldChange}
										/>
										{this.renderErrorFor('name')}
									</div>
									<div className='form-group'>
										<label htmlFor='description'>Project Description</label>
										<textarea
											id='description'
											className={`form-control ${this.renderErrorFor('description') ? 'is-invalid' : ''}`}
											name='description'
											rows='10'
											value={this.state.description}
											onChange={this.handleFieldChange}
										/>
									</div>
									<button className='btn btn-primary'>Create</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default NewProject;
