// @flow
import React, { useEffect } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { Calendar, Navbar, Sidebar, TemplateSearch } from './components'
import WindowState from './windowState'
import * as Selectors from './redux/selectors'
import { copyWorkout, removeWorkout } from './redux/reducers/workoutsSlice'
import { saveNewTrainingTemplate} from './redux/reducers/templatesSlice'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const DELETE_KEYCODE = 46
const BACKSPACE_KEYCODE = 8

function App(props) {
  const [dialogValue, setDialogValue] = React.useState({
    name: '',
    length: '',
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    props.templateAdded({
      name: dialogValue.name,
      length: parseInt(dialogValue.length, 10),
    })
  }

  const handleUserKeyPress = (e) => {
    if (e.keyCode === DELETE_KEYCODE || e.keyCode === BACKSPACE_KEYCODE) {
      if (WindowState.hovered_card_id) {
        props.deleteWorkout(WindowState.hovered_card_id)
      }
    } else if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
      if (WindowState.hovered_card_id) {
        WindowState.copied_card_id = WindowState.hovered_card_id
      }
    } else if ((e.metaKey || e.ctrlKey) && e.key === 'v') {
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
    if (props.currentTemplate) {
      return (
        <div className='app'>
          <div style={{ float: 'right' }}>
            <Navbar />
          </div>
          <div className='side-bar'>
            <Sidebar />
          </div>
          <div className='calendar'>
            <TemplateSearch />
            <Calendar />
          </div>
        </div>
      )
    } else {
      return (
        <Dialog
          aria-labelledby="add-template"
          fullWidth={true}
          open={true}
        >
          <form onSubmit={handleSubmit}>
            <DialogTitle id="add-template">Create your first training program!</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                id="name"
                label="Name your program"
                onChange={(event) => setDialogValue({ ...dialogValue, name: event.target.value })}
                required={true}
                style={{ margin: '5px'}}
                type="text"
                value={dialogValue.name}
              />
              <TextField
                id="length"
                label="How many weeks?"
                onChange={(event) => setDialogValue({ ...dialogValue, length: event.target.value })}
                required={true}
                style={{ margin: '5px'}}
                type="number"
                value={dialogValue.length}
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Get started
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )
    }
  } else {
    return null
  }
}

App.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  currentTemplate: PropTypes.object,
}

const mapStateToProps = state => ({
  signedIn: state.user.signed_in,
  currentTemplate: Selectors.getTemplateById(state, state.user.selected_template),
})

const mapDispatchToProps = dispatch => ({
  copyWorkout: (id, day) => dispatch(copyWorkout(id, day)),
  deleteWorkout: (id) => dispatch(removeWorkout(id)),
  templateAdded: (template) => dispatch(saveNewTrainingTemplate(template)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
