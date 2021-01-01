// @flow
import React from 'react'
import Redux from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Selectors from '../../../../../../redux/selectors'
import Draggable from 'react-draggable'
import WorkoutCard from '../../components/WorkoutCard'

const WorkoutCardWrapper = (props) => {
  if (props.workouts.length === 0) { return [] }
  else if (props.workouts.length < 5) {
    return (
      props.workouts.map(workout =>
        <Draggable key={workout.id.toString()}>
          <WorkoutCard workout_id={workout.id} />
        </Draggable>
      )
    )
  } else {
    return (
      <>
        {props.workouts.map(workout =>
          <Draggable key={workout.id.toString()} >
            <WorkoutCard workout_id={workout.id}/>
          </Draggable>
        )}
        <div>Show More</div>
      </>
    )
  }
}

WorkoutCardWrapper.propTypes = {
  dayNumber: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  workouts: Selectors.getWorkoutsByDayNumberFilter(state, ownProps.dayNumber)
})

export default connect(mapStateToProps)(WorkoutCardWrapper)
