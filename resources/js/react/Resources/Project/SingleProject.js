import axios from 'axios'
import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

//  Sections
import Header from '../../Sections/Navs/Header'
import DashNav from '../../Sections/Navs/DashNav'


class SingleProject extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: [],
      project: {},
      tasks: [],
      title: '',
      errors: [],
      loading: false,
    }

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleAddNewTask = this.handleAddNewTask.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
    this.handleMarkProjectAsCompleted = this.handleMarkProjectAsCompleted.bind(this)
  }

  componentDidMount () {
    this.setState({
      loading: true
    })
    axios
      .get('/api/auth/user')
      .then(response => {
        this.setState({
          user: response.data
        })
      })
      .catch(error => {
        const { history } = this.props
        history.push('/login')
      })
    const projectId = this.props.match.params.id

    axios
      .get(`/api/projects/${projectId}`)
      .then(response => {
        this.setState({
          project: response.data,
          tasks: response.data.tasks,
          loading: false,
        })
      })
      .catch(error => {
        const { history } = this.props
        history.push('/dashboard/projects')
      })

  }

  handleFieldChange (event) {
    this.setState({
      title: event.target.value
    })
  }

  handleAddNewTask (event) {
    event.preventDefault()

    this.setState({
      loading: true
    })

    const task = {
      title: this.state.title,
      project_id: this.state.project.id
    }

    axios
      .post(`/api/projects/${this.state.project.id}/tasks`, task)
      .then(response => {
        this.setState(prevState => ({
          title: '',
          tasks: prevState.tasks.concat(response.data),
          loading: false,
        }))
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors,
          loading: false,
        })
      })
  }

  hasErrorFor (field) {
    return !!this.state.errors[field]
  }

  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className='invalid-feedback'>
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      )
    }
  }

  handleMarkProjectAsCompleted () {
    const { history } = this.props

    this.setState({
      loading: true
    })

    axios
      .put(`/api/projects/${this.state.project.id}`)
      .then(response => history.push('/dashboard/projects'))
      .catch(error => {
        this.setState({
          loading: false
        })
      })
  }

  handleMarkTaskAsCompleted (taskId) {
    this.setState({
      loading: true
    })

    axios
      .put(`/api/projects/${this.state.project.id}/tasks/${taskId}`)
      .then(response => {
        this.setState(prevState => ({
          tasks: prevState.tasks.filter(task => {
            return task.id !== taskId
          }),
          loading: false
        }))
      })
  }

  render () {
    const { project, tasks, loading } = this.state

    const loadingBarClass = loading ? 'loading-bar-tall' : ''
    const progressBarClass = loading ? 'progress-bar-striped progress-bar-animated' : ''

    return (
      <div id='dashboard'>
        <Header />
        <div className='container py-4'>
          <div className='row justify-content-center'>
            <div className='col-lg-3 col-md-4 mb-2'>
              <DashNav />
            </div>
            <div className='col-lg-9 col-md-8'>
            <div className='card'>
              <div className='card-header'>{project.name}</div>

              <div className={'progress ' + loadingBarClass}>
                <div className={'progress-bar ' + progressBarClass}></div>
              </div>

              <div className='card-body'>
                <p>{project.description}</p>

                <button
                  className='btn btn-primary btn-sm'
                  onClick={this.handleMarkProjectAsCompleted}
                >
                  Mark as completed
                </button>

                <hr />

                <form onSubmit={this.handleAddNewTask}>
                  <div className='input-group'>
                    <input
                      type='text'
                      name='title'
                      className={`form-control form-control-lg ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                      placeholder='Task title'
                      value={this.state.title}
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
                        onClick={this.handleMarkTaskAsCompleted.bind(
                          this,
                          task.id
                        )}
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
      </div>
    )
  }
}

export default SingleProject
