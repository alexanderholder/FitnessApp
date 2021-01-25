// @flow
import React, { useEffect } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { Calendar, Navbar, Sidebar, TemplateSearch } from './components'
import WindowState from './windowState'
import { copyWorkout, removeWorkout } from './redux/reducers/workoutsSlice'
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
    } else if ((e.metaKey || e.ctrlKey) && e.key === "c") {
      if (WindowState.hovered_card_id) {
        WindowState.copied_card_id = WindowState.hovered_card_id
      }
    } else if ((e.metaKey || e.ctrlKey) && e.key === "v") {
      console.log(WindowState.copied_card_id, WindowState.hovered_day)
      if (WindowState.copied_card_id && WindowState.hovered_day) {
        props.copyWorkout(WindowState.copied_card_id, WindowState.hovered_day)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress)

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress)
    }
  }, [])

  if (props.signedIn) {
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
  signedIn: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  signedIn: state.user.signed_in
})

const mapDispatchToProps = dispatch => ({
  copyWorkout: (id, day) => dispatch(copyWorkout(id, day)),
  deleteWorkout: (id) => dispatch(removeWorkout(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
