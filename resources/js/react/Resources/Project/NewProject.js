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

    const { history } = this.props

    const project = {
      name: this.state.name,
      description: this.state.description
    }

    axios
      .post('/api/projects', project)
      .then(response => {
        // redirect to the homepage
        history.push('/dashboard/projects')
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
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
  }

  render () {
    const { user } = this.state
    const { projects } = this.state

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

              <div className='card-body'>

                <form onSubmit={this.handleCreateNewProject}>

                  <div className='form-group'>
                    <label htmlFor='name'>Project name</label>
                    <input
                      id='name'
                      type='text'
                      className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
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
                      className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                      name='description'
                      rows='10'
                      value={this.state.description}
                      onChange={this.handleFieldChange}
                    />

                    {this.renderErrorFor('description')}
                  </div>

                  <button className='btn btn-primary'>Create</button>
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
