// @flow
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Calendar from './components/Calendar'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import TemplateSearch from './components/TemplateSearch'
import WindowState from 'windowState'
import * as Selectors from './redux/selectors'
import { removeExcercise } from './redux/reducers/excercisesSlice'
import { removeBlock } from './redux/reducers/blocksSlice'
import { copyWorkout, removeWorkout } from './redux/reducers/workoutsSlice'
import { saveNewTrainingTemplate} from './redux/reducers/templatesSlice'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import ButtonGroup from './components/ButtonGroup'
import Search from './components/Search'

const DELETE_KEYCODE = 46
const BACKSPACE_KEYCODE = 8

function App(props) {
  const [search, setSearch] = React.useState('')
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
        if (props.view === 'Session') {
          props.deleteWorkout(WindowState.hovered_card_id)
        } else if (props.view === 'Block') {
          props.deleteBlock(WindowState.hovered_card_id)
        } else if (props.view === 'Excercise') {
          props.deleteExcercise(WindowState.hovered_card_id)
        }
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
  }, [props.view])

  if (props.signedIn) {
    if (props.currentTemplate) {
      return (
        <div className='p-3'>
          <div className='w-48 inline-block max-w-xs'>
            <Sidebar />
          </div>
          <div className='inline-block pl-1.5 w-auto fixed'>
            <div className='sticky w-full items-center'>
              <div className='float-left flex'>
                <TemplateSearch />
                <Search
                  className='w-96'
                  value={search}
                  onChange={setSearch}
                />
              </div>
              <div className='float-right flex'>
                <ButtonGroup
                  className='mr-4'
                  inputs={['Session','Block','Excercise']}
                  selected={props.view}
                  setSelection={props.changeView}
                />
                <Navbar />
              </div>
            </div>
            <Calendar search={search} />
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
          <form onSubmit={handleSubmit} autoComplete="off">
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
                error={Boolean(Number(dialogValue.length) < 1)}
                helperText={Boolean(Number(dialogValue.length) < 1) ? "Weeks must be greater than 0." : null}
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
    window.location.href = props.response_url
    return null
  }
}

App.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  currentTemplate: PropTypes.object,
  response_url: PropTypes.string,
}

const mapStateToProps = (state) => ({
  signedIn: state.user.signed_in,
  currentTemplate: Selectors.getTemplateById(state, state.user.selected_template),
  response_url: state.user.response_url,
  view: state.user.selected_view,
})

const mapDispatchToProps = (dispatch) => ({
  copyWorkout: (id, day) => dispatch(copyWorkout(id, day)),
  deleteWorkout: (id) => dispatch(removeWorkout(id)),
  deleteBlock: (id) => dispatch(removeBlock(id)),
  deleteExcercise: (id) => dispatch(removeExcercise(id)),
  templateAdded: (template) => dispatch(saveNewTrainingTemplate(template)),
  changeView: (view) => dispatch({ type: 'user/viewChanged', payload: view }),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
