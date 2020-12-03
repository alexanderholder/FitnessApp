import React          from "react"
import Redux          from "redux"
import { connect }    from "react-redux"
import Draggable      from 'react-draggable'
import WorkoutCard    from "../WorkoutCard"
import { getWorkoutsByDayNumberFilter } from "../../selectors"

const WorkoutCards = (props) => {
  let workoutCards = []
  if (props.workouts.length > 0) {
    if (props.workouts.length < 5) {
      for (let i = 0; i < props.workouts.length; i++) {
        workoutCards.push(
          <Draggable>
            <div className="workout-element">
              <WorkoutCard workoutDetails={props.workouts[i]} />
            </div>
          </Draggable>
        )
      }
    } else {
      for (var i = 0; i < 4; i++) {
        workoutCards.push(
          <Draggable>
            <div className="workout-element">
              <WorkoutCard workoutDetails={props.workouts[i]} />
            </div>
          </Draggable>
        )
      }
      workoutCards.push(<div>Show More</div>)
    }
  }

  return workoutCards
}

const mapStateToProps = (state, ownProps) => {
  const workouts = getWorkoutsByDayNumberFilter(state, ownProps.dayNumber)
  return { workouts }
}

export default connect(mapStateToProps)(WorkoutCards)
