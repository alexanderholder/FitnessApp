// @flow
import React          from "react"
import Redux          from "redux"
import PropTypes      from 'prop-types'
import { connect }    from "react-redux"
import Draggable      from 'react-draggable'
import WorkoutCard    from "../WorkoutCard"
import { getWorkoutsByDayNumberFilter } from "../../selectors"

const WorkoutCards = (props) => {
  if (props.workouts.length === 0) { return [] } else
  if (props.workouts.length < 5) {
    return (
      props.workouts.map(workout =>
        <Draggable>
          <div className="workout-element">
            <WorkoutCard workoutDetails={workout} />
          </div>
        </Draggable>
      )
    )
  } else {
    return (
      <div>
        {props.workouts.map(workout =>
          <Draggable>
            <div className="workout-element">
              <WorkoutCard workoutDetails={workout} />
            </div>
          </Draggable>
        )}
        <div>Show More</div>
      </div>
    )
  }
}

WorkoutCards.propTypes = {
  dayNumber: PropTypes.number.isRequired,
  // workouts: PropTypes.arrayOf(Workout).isRequired TODO fix this later
  workouts: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const workouts = getWorkoutsByDayNumberFilter(state, ownProps.dayNumber)
  return { workouts }
}

export default connect(mapStateToProps)(WorkoutCards)
