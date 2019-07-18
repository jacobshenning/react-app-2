import axios from 'axios'
import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

//  Sections
import Header from '../../Sections/Navs/Header'
import DashNav from '../../Sections/Navs/DashNav'


class ProjectsList extends Component {
  constructor () {
    super()

    this.state = {
      user: [],
      projects: []
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
      axios.get('/api/projects').then(response => {
        this.setState({
          projects: response.data
        })
      }).catch(error => {
        console.log(error)
      })
  }

  render () {
    const { user } = this.state
    const { projects } = this.state

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
                <div className='card-header'>All projects</div>

                <div className='card-body'>
                  <Link className='btn btn-primary btn-sm mb-3' to='/dashboard/projects/create'>
                    Create new project
                  </Link>

                  <ul className='list-group list-group-flush'>
                    {projects.map(project => (
                      <Link
                        className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                        to={`/dashboard/projects/${project.id}`}
                        key={project.id}
                      >
                        {project.name}
                        <span className='badge badge-primary badge-pill'>
                          {project.tasks_count}
                        </span>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectsList
