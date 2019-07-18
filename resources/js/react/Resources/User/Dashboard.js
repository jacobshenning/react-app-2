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
      user: []
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
                <div className='card-header'>Dashboard</div>

                <div className='card-body'>
                  Welcome {user.name}
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
