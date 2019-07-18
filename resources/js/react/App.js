
//  React App
import React, { Component } from 'react'

//  React Dom
import ReactDOM from 'react-dom'

//  React Router
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//  Resources
import Dashboard from './Resources/User/Dashboard'
import Profile   from './Resources/User/Profile'
import Home      from './Resources/Public/Home'
import Structure from './Resources/Public/Structure'
import ProjectsList  from './Resources/Project/ProjectList'
import NewProject    from './Resources/Project/NewProject'
import SingleProject from './Resources/Project/SingleProject'
import MessageBox from './Resources/Message/MessageBox'


//  Requests
import LoginRequest from './Requests/Auth/LoginRequest'
import RegisterRequest from './Requests/Auth/RegisterRequest'

//  Components

//  App
class App extends Component {

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/structure' component={Structure} />
          <Route exact path='/login' component={LoginRequest} />
          <Route exact path='/register' component={RegisterRequest} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/dashboard/chat' component={MessageBox} />
          <Route exact path='/dashboard/profile' component={Profile} />
          <Route exact path='/dashboard/projects' component={ProjectsList} />
          <Route exact path='/dashboard/projects/create' component={NewProject} />
          <Route exact path='/dashboard/projects/:id' component={SingleProject} />
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
