import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

//  Sections
import Header from '../../Sections/Navs/Header'

class Structure extends Component {
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
              <h1>React App Structure</h1>
              <p className='lead'>The different component layers</p>
              <div className="alert alert-danger" role="alert">
                <h4> App Component </h4>
                <hr />
                <p> The app component serves as the container for the react app. It imports the router, componets, and then compiles the main view. Since this app doesn't use redux, the app container is pretty simple </p>
              </div>
              <div className="alert alert-primary" role="alert">
                <h4> Resource Components </h4>
                <hr />
                <p> Resource components fall into a tree of directories inside the react app file structure. Each resource component is contained in a topical directory. Each topical directory is directly tied to a Controller in the Laravel API. An example structure is below</p>
                <p><strong>ProjectController</strong></p>
                <ul>
                  <li>CreateProject()</li>
                  <li>EditProject()</li>
                  <li>BrowseProject()</li>
                  <li>ViewProject()</li>
                  <li>DeleteProject()</li>
                </ul>
                <p><strong>React App Resource Directory</strong></p>
                <ul>
                  <li>Resource/Projects/CreateProject.js</li>
                  <li>Resource/Projects/EditProject.js</li>
                  <li>Resource/Projects/CreateProject.js</li>
                  <li>Resource/Projects/ViewProject.js</li>
                </ul>
                <p> Notice that there is no component for deleting a project. Sometimes a resource component can be responsible for multiple resource interactions. In this case, users may end up deleteing Projects from within the browse or view components.</p>
              </div>
              <div className="alert alert-success" role="alert">
                <h4> Request Components </h4>
                <hr />
                <p>Remember how I said Resource Components will sometimes handle multiple resource interactions? That's what makes request components different. Request components are designed to do one thing: Facilitate a single request. Request components should be used anytime you need to validate request data and might be sending information back and forth frequently.</p>
              </div>
              <div className="alert alert-warning" role="alert">
                <h4> Section Components </h4>
                <hr />
                <p>Section components are low functioning components designed to be used over and over again. Section components are going to be things like navbars and footers, and rarely carry any special functionality.</p>
              </div>
              <div className="alert alert-info" role="alert">
                <h4> Components </h4>
                <hr />
                <p>Components are the simplest form of component. Their only job is to display data passed into them. They don't bind to anything, they aren't updating anything, they're just displaying data on the user interface.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Structure
