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
            <div className='col-md-8 col-12'>
              <h1 className='display-4 d-none d-md-inline-block pb-1'>React Application</h1>
              <h1 className='d-inline-block d-md-none mb-1'>React Application</h1>
              <p className='lead'>A new React Application structure designed to be sustainable for full SPA</p>
              <div className='card'>
                <div className='card-header'>Scalable Structure</div>
                <div className='progress'>
                  <div className='progress-bar'></div>
                </div>
                <div className='card-body'>
                  <p> By using a new scalable structure which is able to mirror Laravel Http namespacing, this app is capable of building out a SPA to the full extent of Laravel API</p>
                  <div className="btn-group btn-block d-none d-md-flex" role="group" aria-label="Basic example">
                    <Link className="btn btn-outline-primary" to='/structure'>Checkout Structure</Link>
                    <Link className="btn btn-outline-primary" to='/register'>Create Account</Link>
                    <Link className="btn btn-outline-primary" to='/dashboard'>Visit Dashboard</Link>
                    <a className="btn btn-outline-primary" href='https://github.com/jacobshenning/react-app' target='_blank'>GitHub</a>
                  </div>
                  <div className="btn-group-vertical btn-block d-flex d-md-none" role="group" aria-label="Basic example">
                    <Link className="btn btn-outline-primary" to='/structure'>Checkout Structure</Link>
                    <Link className="btn btn-outline-primary" to='/register'>Create Account</Link>
                    <Link className="btn btn-outline-primary" to='/dashboard'>Visit Dashboard</Link>
                    <a className="btn btn-outline-primary" href='https://github.com/jacobshenning/react-app' target='_blank'>GitHub</a>
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
