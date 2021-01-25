// @flow
import React, { useState } from 'react'
import Redux from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Draggable from 'react-draggable'
import * as Selectors from 'javascript/redux/selectors'
import WindowState from 'javascript/windowState'
import { updateWorkout } from 'javascript/redux/reducers/workoutsSlice'
import { makeStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import WorkoutFormWrapper from '../../views/WorkoutFormWrapper'

const WorkoutCard = (props) => {
  const [anchorEl, setAnchorEl] = useState(props.newCard)
  const handleCardIsHovered = (payload) => WindowState.hovered_card_id = payload

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    props.setIsShown(false)
  }
  const handleClose = () => {
    setAnchorEl(null)
    WindowState.new_card_id = null
  }

  return (
    <React.Fragment>
      <div
        className='workout-element'
        draggable
        onClick={handleClick}
        onMouseEnter={() => handleCardIsHovered(props.workoutId)}
        onMouseLeave={() => handleCardIsHovered(null)}
        onDragEnd={() => props.updateWorkout({ day_number: WindowState.hovered_day })}
      >
        { props.workout.name }
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
        <WorkoutFormWrapper
          workoutId={props.workout.id}
          setAnchorEl={setAnchorEl}
        />
      </Popover>
    </React.Fragment>
  )
}

WorkoutCard.propTypes = {
  workoutId: PropTypes.number.isRequired,
  setIsShown: PropTypes.func.isRequired,
  newCard: PropTypes.bool.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  workout: Selectors.getWorkoutById(state, ownProps.workoutId),
  newCard: ownProps.workoutId == WindowState.new_card_id ? true : false
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateWorkout: (payload) => dispatch(updateWorkout(ownProps.workoutId, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutCard)
