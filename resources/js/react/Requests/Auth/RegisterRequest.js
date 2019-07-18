import axios from 'axios'
import React, { Component } from 'react'

import Header from '../../Sections/Navs/Header'

class RegisterRequest extends Component {
  constructor (props) {

    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      remember: false,
      errors: []
    }

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleRegisterAttempt = this.handleRegisterAttempt.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  componentWillMount() {
    if (window.api_token) {
      const { history } = this.props
      history.push('/dashboard')
    }
  }

  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
    })
  }

  handleRegisterAttempt (event) {
    event.preventDefault();

    this.setState({
      errors: []
    })

    const { history } = this.props

    const credentials = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }

    axios
      .post('/api/auth/register', credentials)
      .then(response => {
        window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data

        window.api_token = response.data

        var now = new Date()
        var offset = this.state.remember ? 90 * 24 * 3600 * 1000 : 3600 * 1000
        now.setTime(now.getTime() + offset)
        document.cookie = "api_token=" + response.data +  "; expires=" + now.toUTCString() + "; path=/"

        history.push('/dashboard')
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

  render () {
    return (
      <div id='login-request'>
        <Header />
        <div className='container py-4'>
          <div className='row justify-content-center'>
            <div className='col-md-6'>
              <div className='card'>
                <div className='card-header'>Register</div>

                <div className='card-body'>

                  <form onSubmit={this.handleRegisterAttempt}>

                    <div className='form-group'>
                      <label htmlFor='name'>Name</label>
                      <input
                        id='name'
                        type='text'
                        className={`form-control form-control-lg ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                        name='name'
                        value={this.state.name}
                        onChange={this.handleFieldChange}
                        autoComplete="off"
                      />
                      {this.renderErrorFor('name')}
                    </div>

                    <div className='form-group'>
                      <label htmlFor='email'>Email</label>
                      <input
                        id='email'
                        type='email'
                        className={`form-control form-control-lg ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                        name='email'
                        value={this.state.email}
                        onChange={this.handleFieldChange}
                        autoComplete="off"
                      />
                      {this.renderErrorFor('email')}
                    </div>

                    <div className='form-group'>
                      <label htmlFor='password'>Password</label>
                      <input
                        id='password'
                        type='password'
                        className={`form-control form-control-lg ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
                        name='password'
                        rows='10'
                        value={this.state.password}
                        onChange={this.handleFieldChange}
                        autoComplete="off"
                      />

                      {this.renderErrorFor('password')}
                    </div>

                    <div className='form-group'>
                      <label htmlFor='password_confirmation'>Confirm Password</label>
                      <input
                        id='password_confirmation'
                        type='password'
                        className={`form-control form-control-lg ${this.hasErrorFor('password_confirmation') ? 'is-invalid' : ''}`}
                        name='password_confirmation'
                        rows='10'
                        value={this.state.password_confirmation}
                        onChange={this.handleFieldChange}
                        autoComplete="off"
                      />

                      {this.renderErrorFor('password_confirmation')}
                    </div>
                    <div className="form-group form-check">
                      <input
                        id="remember"
                        name="remember"
                        type="checkbox"
                        className="form-check-input"
                        checked={this.state.remember}
                        onChange={this.handleFieldChange}
                        />
                      <label className="form-check-label" htmlFor="remember">Stay logged in</label>
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

export default RegisterRequest
