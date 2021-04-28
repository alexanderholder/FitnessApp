// @flow
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Selectors from 'javascript/redux/selectors'
import WindowState from 'javascript/windowState'
import { copyWorkout, updateWorkout } from 'javascript/redux/reducers/workoutsSlice'
import { makeStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import WorkoutForm from '../WorkoutForm'

function Card(props) {
  const [anchorEl, setAnchorEl] = useState(props.newCard)
  const [dragOverIsShown, setDragOverIsShown] = useState(false)
  const [showBlockPopover, setShowBlockPopover] = useState(false)

  const handleMouseEnter = () => {
    // TODO: this will stop copy paste from tempaltes :(
    if (!props.templateWorkout) {
      WindowState.hovered_card_id = props.id
    }
    // if (props.view === 'Block') {
      // console.log(payload)
      // setAnchorEl(event.currentTarget)
      // setShowBlockPopover(true)
    // }
  }
  const handleMouseLeave = () => {
    // TODO: this will stop copy paste from tempaltes :(
    if (!props.templateWorkout) {
      WindowState.hovered_card_id = null
    }
    // setAnchorEl(null)
    // setShowBlockPopover(false)
  }
  const handleClick = (event) => {
    if (!props.templateWorkout) {
      setAnchorEl(event.currentTarget)
      props.setIsShown(false)
    }
  }
  const handleClose = () => {
    setAnchorEl(null)
    WindowState.new_card_id = null
  }
  const handleDragEnd = () => {
    if (props.templateWorkout) {
      props.copyWorkout()
    } else {
      props.updateWorkout({ day_number: WindowState.hovered_day })
    }
  }
  const handleDragEnter = (e) => {
    WindowState.hovered_card_id = props.id
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <React.Fragment>
      <div
        className='workout-element'
        draggable
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onDragEnd={handleDragEnd}
        onDragEnter={handleDragEnter}
        onDragOver={(e) => e.preventDefault()}
      >
        { props.cardName }
      </div>
      <Popover
        className='workout-form'
        id={Boolean(anchorEl) ? 'simple-popover' : undefined}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <WorkoutForm
          workoutId={props.workoutId}
          setAnchorEl={setAnchorEl}
        />
      </Popover>
      <Popover
        className='block-hoverover'
        id={Boolean(showBlockPopover) ? 'simple-popover' : undefined}
        open={Boolean(showBlockPopover)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div>hello!</div>
      </Popover>
    </React.Fragment>
  )
}

Card.propTypes = {
  templateWorkout: PropTypes.bool,
  setIsShown: PropTypes.func.isRequired,
  workoutId: PropTypes.number,
}

Card.defaultProps = {
  templateWorkout: false,
}

const mapStateToProps = (state, ownProps) => {
  const newCard = ownProps.workoutId == WindowState.new_card_id ? true : false
  const view = state.user.selected_view

  let cardName
  let id
  if (view === 'Excercise') {
    cardName = Selectors.getExcerciseById(state, ownProps.excerciseId)?.movement
    id = ownProps.excerciseId
  }
  else if (view === 'Block') {
    cardName = Selectors.getBlockById(state, ownProps.blockId)?.name
    id = ownProps.blockId
  }
  else {
    cardName = Selectors.getWorkoutById(state, ownProps.workoutId).name
    id = ownProps.workoutId
  }

  return { cardName, newCard, view, id }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  copyWorkout: () => dispatch(copyWorkout(ownProps.workoutId, WindowState.hovered_day)),
  updateWorkout: (payload) => dispatch(updateWorkout(ownProps.workoutId, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)
