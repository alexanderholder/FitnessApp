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

function WorkoutCard (props) {
  const [anchorEl, setAnchorEl] = useState(props.newCard)
  const [dragOverIsShown, setDragOverIsShown] = useState(false)

  const handleCardIsHovered = (payload) => {
    // TODO: this will stop copy paste from tempaltes :(
    if (!props.templateWorkout) {
      WindowState.hovered_card_id = payload
    }
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
    WindowState.hovered_card_id = props.workoutId
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <React.Fragment>
      <div
        className='workout-element'
        draggable
        onClick={handleClick}
        onMouseEnter={() => handleCardIsHovered(props.workoutId)}
        onMouseLeave={() => handleCardIsHovered(null)}
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
    </React.Fragment>
  )
}

WorkoutCard.propTypes = {
  templateWorkout: PropTypes.bool,
  setIsShown: PropTypes.func.isRequired,
  workoutId: PropTypes.number,
  blockId: PropTypes.number,
}

WorkoutCard.defaultProps = {
  templateWorkout: false,
}

const mapStateToProps = (state, ownProps) => {
  const newCard = ownProps.workoutId == WindowState.new_card_id ? true : false
  let cardName
  if (ownProps.excerciseId) {
    cardName = Selectors.getExcerciseById(state, ownProps.excerciseId).movement
  } else if (ownProps.blockId) {
    cardName = Selectors.getBlockById(state, ownProps.blockId).name
  } else {
    cardName = Selectors.getWorkoutById(state, ownProps.workoutId).name
  }

  return { cardName, newCard }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  copyWorkout: () => dispatch(copyWorkout(ownProps.workoutId, WindowState.hovered_day)),
  updateWorkout: (payload) => dispatch(updateWorkout(ownProps.workoutId, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutCard)
