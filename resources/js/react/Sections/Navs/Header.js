import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

class Header extends Component {

  constructor () {
    super()

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    window.api_token = false
    document.cookie = "api_token=false; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
  }

  render () {

    let userControls

    if (window.api_token) {
      userControls = <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink exact={true} activeClassName='text-light' className='nav-link' to='/dashboard'>Dashboard</NavLink>
        </li>
        <li className="nav-item" >
          <Link className='nav-link' onClick={this.handleLogout} to='/'>Logout</Link>
        </li>
      </ul>;
    } else {
      userControls = <ul className="navbar-nav">
        <li className="nav-item" >
          <NavLink exact={true} activeClassName='text-light' className='nav-link' to='/login'>Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact={true} activeClassName='text-light' className='nav-link' to='/register'>Register</NavLink>
        </li>
      </ul>;
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <Link className='navbar-brand' to='/'>React App</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact={true} activeClassName='text-light' className='nav-link' to='/'>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact={true} activeClassName='text-light' className='nav-link' to='/structure'>Structure</NavLink>
            </li>
          </ul>
          <hr className="bg-light" />
          {userControls}
        </div>
      </nav>
    )
  }
}

export default Header
