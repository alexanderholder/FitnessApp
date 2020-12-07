// @flow
import React          from "react"
import Redux          from "redux"
import PropTypes      from 'prop-types'
import { connect }    from "react-redux"
import Draggable      from 'react-draggable'
import WorkoutCard    from "../WorkoutCard"
import { getWorkoutsByDayNumberFilter } from "../../selectors"

const WorkoutCardWrapper = (props) => {
  if (props.workouts.length === 0) { return [] } else
  if (props.workouts.length < 5) {
    return (
      props.workouts.map(workout =>
        <Draggable key={workout.id.toString()} >
          <WorkoutCard workout_id={workout.id} />
        </Draggable>
      )
    )
  } else {
    return (
      <div>
        {props.workouts.map(workout =>
          <Draggable key={workout.id.toString()} >
            <WorkoutCard workout_id={workout.id} />
          </Draggable>
        )}
        <div>Show More</div>
      </div>
    )
  }
}

WorkoutCardWrapper.propTypes = {
  dayNumber: PropTypes.number.isRequired,
  // workouts: PropTypes.arrayOf(Workout).isRequired TODO fix this later
  workouts: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const workouts = getWorkoutsByDayNumberFilter(state, ownProps.dayNumber)
  return { workouts }
}

export default connect(mapStateToProps)(WorkoutCardWrapper)
