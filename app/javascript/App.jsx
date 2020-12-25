// @flow
import React      from "react"
import { render } from "react-dom"
import PropTypes  from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { Calendar, Navbar, Sidebar, TemplateSearch } from "./components"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const App = props => {
  if (props.signed_in) {
    return (
      <div className="app">
        <div className="float-right">
          <Navbar />
        </div>
        <div className="side-bar">
          <Sidebar />
        </div>
        <div className="calendar">
          <TemplateSearch />
          <Calendar />
        </div>
      </div>
    )
  } else {
    return null
  }
}

App.propTypes = {
  signed_in: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  signed_in: state.user.signed_in
})

export default connect(mapStateToProps)(App)
