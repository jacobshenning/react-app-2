import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

class DashNav extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <ul className="list-group card">
        <div className="card-header">Menu</div>
        <div className='progress'>
          <div className='progress-bar'></div>
        </div>
        <NavLink className="list-group-item border-0" exact={true} to='/dashboard'>Dashboard</NavLink>
        <NavLink className="list-group-item border-0" exact={true} to='/dashboard/profile'>Profile</NavLink>
        <NavLink className="list-group-item border-0" exact={false} to='/dashboard/projects'>Projects</NavLink>
        <NavLink className="list-group-item border-0" exact={true} to='/dashboard/chat'>Chat</NavLink>
      </ul>
    )
  }
}

export default DashNav
