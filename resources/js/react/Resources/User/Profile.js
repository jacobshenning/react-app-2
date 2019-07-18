import axios from 'axios'
import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

//  Sections
import Header from '../../Sections/Navs/Header'
import DashNav from '../../Sections/Navs/DashNav'

class Dashboard extends Component {
  constructor () {
    super()

    this.state = {
      user: [],
      loading: false,
    }
  }

  componentDidMount () {
    this.setState({
      loading: true,
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
    const { user, loading } = this.state

    const loadingBarClass = loading ? 'loading-bar-tall' : ''
    const progressBarClass = loading ? 'progress-bar-striped progress-bar-animated' : ''

    return (
      <div id='profile'>
        <Header />
        <div className='container py-4'>
          <div className='row justify-content-center'>
            <div className='col-lg-3 col-md-4 mb-2'>
              <DashNav />
            </div>
            <div className='col-lg-9 col-md-8'>
              <div className='card'>
                <div className='card-header'>Profile</div>
                <div className={'progress ' + loadingBarClass}>
                  <div className={'progress-bar ' + progressBarClass}></div>
                </div>
                <div className='card-body'>
                  <p> Name: {user.name} </p>
                  <p> Email: {user.email} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
