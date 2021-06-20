import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Calendar from 'Calendar/components/Calendar'
import Navbar from 'Calendar/components/Navbar'
import Sidebar from 'Calendar/components/Sidebar'
import TemplateSearch from 'Calendar/components/TemplateSearch'
import ButtonGroup from 'Calendar/components/ButtonGroup'
import Search from 'components/Search'
import WindowState from 'windowState'
import * as Selectors from 'Calendar/redux/selectors'
import { removeExcercise } from 'Calendar/redux/reducers/excercisesSlice'
import { removeBlock } from 'Calendar/redux/reducers/blocksSlice'
import { copyWorkout, removeWorkout } from 'Calendar/redux/reducers/workoutsSlice'
import { saveNewTrainingTemplate} from 'Calendar/redux/reducers/templatesSlice'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

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
        <div className='dark:bg-gray-800 dark:text-white'>
          <nav className='h-20 flex sticky top-0 justify-around bg-white shadow'>
            <h1 className='my-6 text-xl font-mono'>AptusFit</h1>

            <TemplateSearch className='my-1' />

            <Search
              className='w-96 my-1'
              value={search}
              onChange={setSearch}
            />

            <ButtonGroup
              className='mr-4 my-2'
              inputs={['Session','Block','Excercise']}
              selected={props.view}
              setSelection={props.changeView}
            />
          </nav>

          <main className='h-screen flex'>
            <aside className='p-3 min-w-min h-screen w-1/12 bg-gray-50 dark:bg-gray-600 dark:text-white'>
              <Sidebar />
            </aside>

            <Calendar search={search} />
          </main>
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
