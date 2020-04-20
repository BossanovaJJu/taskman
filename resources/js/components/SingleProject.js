import React, { Component } from 'react';
import Axios from 'react-router-dom';

class SingleProject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: {},
			tasks: [],
			taskTitle: '',
			taskErros: []
		}
	}
	componentDidMount() {
		const projectId = this.props.match.params.id;
		axios.get(`/api/projects/${projectId}`).then(response => {
			this.state({
				project: response.data,
				tasks: response.data.tasks
			})
		})
	}
	handleMarkProjectAsCompleted = () => {
		const { history } = this.props;
		Axios.put(`/api/projects/${this.state.project.id}`)
			.then(response => history.push('/'))
	}
	handleFieldChange = event => {
		this.setState({
			taskTitle: event.target.value
		})
	}
	handleAddNewTask = event => {
		event.preventDefault();

		const task = {
			taskTitle: this.state.taskTitle,
			project_id: this.state.project.id
		}

		Axios.post('/api/tasks', task)
			.then(response => {
				//clear form input
				this.setState({
					taskTitle: ''
				})
				//add new task to list of tasks
				this.setState(prevState => ({
					tasks: prevState.tasks.concat(response.data)
				}))
			})
			.catch(error => {
				this.setState({
					taskErrors: error.response.data.errors
				})
			})
	}
	hasErrorFor = field => {
		return !!this.state.taskErrors[field]
	}
	renderErrorFor = field => {
		if(hasErrorFor) {
			return (
				<span className='invalid-feedback'>
					<strong>{this.state.taskErrors[field][0]}</strong>
				</span>
			)
		}
	}
	handleMarkTaskAsCompleted = taskId => {
		Axios.put(`/api/tasks/${taskId}`)
			.then(response => {
				this.setState(prevState => ({
					tasks: prevState.tasks.filter(task => {
						return task.id !== taskId
					})
				}))
			})
	}

	render() {
		const { project, tasks } = this.state;
		return(
			<div className='container py-4'>
				<div className='row justify-content-center'>
					<div className='col-md-8'>
						<div className='card'>
							<div className='card-header'>{project.title}</div>
							<div className='card-body'>
								<p>{project.description}</p>
								<button
									className='btn btn-primary btn-sm'
									onClick={this.handleMarkProjectAsCompleted}
								>
									Mark as completed
								</button>
								<hr/>
								<form onSubmit={this.handleAddNewTask}>
									<div className='input-group'>
										<input
												type='text'
												name='title'
												className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
												placeholder='Task title'
												value={this.state.taskTitle}
												onChange={this.handleFieldChange}
										/>
										<div className='input-group-append'>
											<button className='btn btn-primary'>Add</button>
										</div>
										{this.renderErrorFor('title')}
									</div>
								</form>
								<ul className='list-group mt-3'>
									{tasks.map(task => (
										<li
											className='list-group-item d-flex justify-content-between align-items-center'
											key={task.id}
										>
											{task.title}
											<button
												className='btn btn-primary btn-sm'
												onClick={this.handleMarkTaskAsCompleted.bind(this, task.id)}
											>
												Mark as completed
											</button>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default SingleProject;
