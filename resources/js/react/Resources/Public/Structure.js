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
                <p> The app component serves as the container for the React App. It imports the Router, React Components, and compiles them into a view. The app container is simple without the use of a <mark>state</mark> library like Redux. The only complexity left in this app container is from grabbing an <mark>api_token cookie</mark> and using the React Router</p>
              </div>
              <div className="alert alert-primary" role="alert">
                <h4> Resource Components </h4>
                <hr />
                <p> Resource Components are category-based components. And by category-based I mean both; Resource Components fall under a category and Resource Components sit in a category folder. Each category folder is based on a Laravel Controller, directly linking Resource Components to API Controllers, which helps keep consistent namespacing across the entire application. See example below.</p>
                <p><strong>Laravel Project Controller</strong></p>
                <ul>
                  <li>CreateProject()</li>
                  <li>EditProject()</li>
                  <li>BrowseProject()</li>
                  <li>ViewProject()</li>
                  <li>DeleteProject()</li>
                </ul>
                <p><strong>React App Resource Directory</strong></p>
                <ul>
                  <li>Resource/Project/CreateProject.js</li>
                  <li>Resource/Project/EditProject.js</li>
                  <li>Resource/Project/CreateProject.js</li>
                  <li>Resource/Project/ViewProject.js</li>
                </ul>
                <p>Notice that the Project Controller has a function for deleting projects even though the Resource Component for deleting a project doesn't exist. Resource Components are allowed to handle multiple Controller <mark>endpoints</mark>. There are usually more Resource Components then functions in the corresponding Controller.</p>
              </div>
              <div className="alert alert-success" role="alert">
                <h4> Request Components </h4>
                <hr />
                <p>Request Components are for facilitating a specific request. Unlike Resource Components, Request Components only handle one <mark>endpoint</mark>. Request Components are usually associated with a Laravel RequestForm object in the API. Having a single component setup for validation simplifies validation concerning unique data.</p>
              </div>
              <div className="alert alert-warning" role="alert">
                <h4> Section Components </h4>
                <hr />
                <p>Section Components jobs are somewhat general. Ideally, these components will be kept simple and only used to prevent repeating code. However, in some circumstances, a Section Component can contain a Request Component or <mark>programmatic rendering</mark> based on <mark>state</mark>. Usually, it's for rendering navigation, footers, and so on. </p>
              </div>
              <div className="alert alert-info" role="alert">
                <h4> Components </h4>
                <hr />
                <p>The base Component is designed to do nothing but render. No data <mark>binding</mark>. No cookie interaction. No API requests. The base component receives <mark>props</mark>, calculates its output, and then renders.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Structure
