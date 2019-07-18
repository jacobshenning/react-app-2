import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

class DashNav extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <ul className="list-group">
        <li className="list-group-item bg-light">Menu</li>
        <NavLink className="list-group-item" exact={true} to='/dashboard'>Dashboard</NavLink>
        <NavLink className="list-group-item" exact={true} to='/dashboard/profile'>Profile</NavLink>
        <NavLink className="list-group-item" exact={true} to='/dashboard/projects'>Projects</NavLink>
        <NavLink className="list-group-item" exact={true} to='/dashboard/chat'>Chat</NavLink>
      </ul>
    )
  }
}

export default DashNav
