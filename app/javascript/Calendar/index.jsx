import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Calendar from 'Calendar/components/Calendar'
import Navbar from 'Calendar/components/Navbar'
import Sidebar from 'Calendar/components/Sidebar'
import TemplateSearch from 'Calendar/components/TemplateSearch'
import ButtonGroup from 'components/ButtonGroup'
import FullPageModal from 'components/FullPageModal'
import Search from 'components/Search'
import WindowState from 'windowState'
import * as Selectors from 'Calendar/redux/selectors'
import { removeExcercise } from 'Calendar/redux/reducers/excercisesSlice'
import { removeBlock } from 'Calendar/redux/reducers/blocksSlice'
import { copyWorkout, removeWorkout } from 'Calendar/redux/reducers/workoutsSlice'
import { saveNewTrainingTemplate} from 'Calendar/redux/reducers/templatesSlice'

const DELETE_KEYCODE = 46
const BACKSPACE_KEYCODE = 8

function App(props) {
  const [newTemplateName, setNewTemplateName] = React.useState('')
  const [newTemplateLength, setNewTemplateLength] = React.useState(6)
  const [search, setSearch] = React.useState('')

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
        <FullPageModal
          open={true}
          setOpen={() => false}
          title='Create your first training program'
          body={
            <form>
              <label>Name your program</label>
              <input
                className='bg-white flex items-center border rounded-xl shadow-md w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none'
                id="name"
                onChange={(event) => setNewTemplateName(event.target.value)}
                type="text"
                value={newTemplateName}
              />
              <label>How many weeks?</label>
              <input
                className='bg-white flex items-center border rounded-xl shadow-md w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none'
                id="length"
                onChange={(event) => setNewTemplateLength(event.target.value)}
                type="number"
                value={newTemplateLength}
              />
            </form>
          }
          submitText='Get started'
          submitFunction={() => props.templateAdded({
            name: newTemplateName,
            length: parseInt(newTemplateLength, 10),
          })}
        />
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
