// @flow
import React, { useEffect } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { Calendar, Navbar, Sidebar, TemplateSearch } from './components'
import WindowState from './windowState'
import { removeWorkout } from './redux/reducers/workoutsSlice'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const DELETE_KEYCODE = 46
const BACKSPACE_KEYCODE = 8

const App = props => {
  const handleUserKeyPress = (e) => {
    if (e.keyCode === DELETE_KEYCODE || e.keyCode === BACKSPACE_KEYCODE) {
      if (WindowState.hovered_card_id) {
        props.deleteWorkout(WindowState.hovered_card_id)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress)

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress)
    }
  }, [])

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

const mapDispatchToProps = dispatch => ({
  deleteWorkout: (id) => dispatch(removeWorkout(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
