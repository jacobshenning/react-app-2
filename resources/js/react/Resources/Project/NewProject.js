import axios from 'axios'
import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

//  Sections
import Header from '../../Sections/Navs/Header'
import DashNav from '../../Sections/Navs/DashNav'


class NewProject extends Component {
  constructor () {
    super()

    this.state = {
      user: [],
      name: '',
      description: '',
      loading: false,
      errors: []
    }

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewProject = this.handleCreateNewProject.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCreateNewProject (event) {
    event.preventDefault()

    this.setState({
      loading: true
    })

    const { history } = this.props

    const project = {
      name: this.state.name,
      description: this.state.description
    }

    axios
      .post('/api/projects', project)
      .then(response => {
        history.push('/dashboard/projects')
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

  componentDidMount () {
    this.setState({
      loading: true
    })
    axios
      .get('/api/auth/user')
      .then(response => {
        this.setState({
          user: response.data,
          loading: false
        })
      })
      .catch(error => {
        const { history } = this.props
        history.push('/login')
      })
  }

  render () {
    const { user, projects, loading } = this.state

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
              <div className='card-header'>Create new project</div>
              <div className={'progress ' + loadingBarClass}>
                <div className={'progress-bar ' + progressBarClass}></div>
              </div>
              <div className='card-body'>

                <form onSubmit={this.handleCreateNewProject}>

                  <div className='form-group'>
                    <label htmlFor='name'>Project name</label>
                    <input
                      id='name'
                      type='text'
                      className={`form-control form-control-lg ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                      name='name'
                      value={this.state.name}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('name')}
                  </div>

                  <div className='form-group'>
                    <label htmlFor='description'>Project description</label>
                    <textarea
                      id='description'
                      className={`form-control form-control-lg ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                      name='description'
                      rows='10'
                      value={this.state.description}
                      onChange={this.handleFieldChange}
                    />

                    {this.renderErrorFor('description')}
                  </div>

                  <button className='btn btn-primary'>Create New Project</button>
                </form>

              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewProject
