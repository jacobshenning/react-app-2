import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

//  Sections
import Header from '../../Sections/Navs/Header'

class Home extends Component {
  constructor () {
    super()
  }

  render () {

    return (
      <div id="home">
        <Header />
        <div className='container py-4'>
          <div className='row justify-content-center'>
            <div className='col-md-8'>
              <h1 className='display-4'>React Application</h1>
              <p className='lead'>A new React Application structure designed to be sustainable for full SPA</p>
              <div className='card'>
                <div className='card-header'>Scalable Structure</div>
                <div className='progress'>
                  <div className='progress-bar'></div>
                </div>
                <div className='card-body'>
                  <p> By using a new scalable structure which is able to mirror Laravel Http namespacing, this app is capable of building out a SPA to the full extent of Laravel API</p>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <Link className="btn btn-outline-primary" to='/structure'>Checkout Structure</Link>
                    <Link className="btn btn-outline-primary" to='/register'>Create Account</Link>
                    <Link className="btn btn-outline-primary" to='/dashboard'>Visit Dashboard</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
