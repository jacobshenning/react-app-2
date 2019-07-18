import axios from 'axios'
import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

//  Sections
import Header from '../../Sections/Navs/Header'
import DashNav from '../../Sections/Navs/DashNav'

class MessageBox extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: [],
      message: '',
      messages: [],
      errors: [],
      loading: false,
      intervalId: ''
    }

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
    this.loadMessages = this.loadMessages.bind(this)
  }
  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
    })
  }

  handleMessageSubmit (event) {
    event.preventDefault()

    const data = {
      message: this.state.message,
    }

    this.setState({
      loading: true
    })

    axios
      .post('/api/messages/create', data)
      .then(response => {
        this.setState({
          message: ''
        })
        this.loadMessages()
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

  loadMessages() {
    this.setState({
      loading: true
    })
    axios.get('/api/messages/all').then(response => {
      this.setState({
        messages: response.data,
        loading: false
      })
      var chatBox = document.getElementById('chat-box');
      chatBox.scrollTop = chatBox.scrollHeight;
    }).catch(error => {
      console.log(error)
    })
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
    this.loadMessages()
    var intervalId = setInterval(this.loadMessages, 5000)
    this.setState({intervalId: intervalId})
  }

  componentWillUnmount () {
     clearInterval(this.state.intervalId)
  }

  render () {
    const { messages, user, loading } = this.state

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
                <div className='card-header'>Chat</div>

                <div className={'progress ' + loadingBarClass}>
                  <div className={'progress-bar ' + progressBarClass}></div>
                </div>

                <div className='card-body'>
                  <div id="chat-box">
                    <div id="chat-content">
                      {messages.map(message => (
                        <div key={message.id} className={'row' + (message.user.id === user.id ? ' flex-row-reverse' : '')}>
                          <div className='col-7'>
                            <div className={'alert' + (message.user.id === user.id ? ' alert-primary' : ' alert-secondary')} role="alert">
                              <strong>{message.user.name}</strong>
                              <p className='p-0 m-0'>{message.message}</p>
                            </div>
                          </div>
                          <div className='col-5'>
                            <div className={'alert' + (message.user.id === user.id ? '' : ' text-right')}>
                              <small className="text-muted">{message.created_at}</small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <form onSubmit={this.handleMessageSubmit}>
                  <div className="input-group">
                    <input
                      id="message"
                      type='text'
                      className={`form-control  ${this.hasErrorFor('message') ? 'is-invalid' : ''}`}
                      placeholder="Message..."
                      name="message"
                      value={this.state.message}
                      onChange={this.handleFieldChange}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="submit">Send</button>
                    </div>
                    {this.renderErrorFor('message')}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MessageBox
