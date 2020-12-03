import React          from "react"
import Redux          from "redux"
import { connect }    from "react-redux"
import Draggable      from 'react-draggable'
import WorkoutCard    from "../WorkoutCard"
import { getWorkoutsByDayNumberFilter } from "../../selectors"

const WorkoutCards = (props) => {
  let workouts = []
  if (props.workouts.length > 0) {
    if (props.workouts.length < 5) {
      for (let i = 0; i < props.workouts.length; i++) {
        workouts.push(
          <Draggable>
            <div className="workout-element">
              <WorkoutCard workoutDetails={workouts[i]} />
            </div>
          </Draggable>
        )
      }
    } else {
      for (var i = 0; i < 4; i++) {
        workouts.push(
          <Draggable>
            <div className="workout-element">
              <WorkoutCard workoutDetails={workouts[i]} />
            </div>
          </Draggable>
        )
      }
      workouts.push(<div>Show More</div>)
    }
  }

  return workouts
}

const mapStateToProps = (state, ownProps) => {
  const workouts = getWorkoutsByDayNumberFilter(state, ownProps.dayNumber)
  return { workouts }
}

export default connect(mapStateToProps)(WorkoutCards)
