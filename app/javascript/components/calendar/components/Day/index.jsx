import React, { useState } from "react"
// import Redux from "redux"
// import { connect } from "react-redux";
import Draggable from 'react-draggable'; // The default
import Workout from "../../../workout/Index";

// const mapStateToProps = (state, ownProps) => ({
//   workouts: state.template_workouts,
// })

function WorkoutDetails(props) {
  const workout_details = props.workout_details
  const workoutsPerDay = workout_details.length
  const workouts = []

  if (workoutsPerDay > 0) {
    if (workoutsPerDay < 5) {
      for (var i = 0; i < workoutsPerDay; i++) {
        workouts.push(
          <Draggable>
            <div className="workout-element">
              <Workout workoutDetails={workout_details[i]} />
            </div>
          </Draggable>
        )
      }
    } else {
      for (var i = 0; i < 4; i++) {
        workouts.push(
          <Draggable>
            <div className="workout-element">
              <Workout workoutDetails={workout_details[i]} />
            </div>
          </Draggable>
        )
      }
      workouts.push(<div>Show More</div>)
    }
  }

  return workouts
}

function Day(props) {
  return (
    <td key={props.daynumber} className="cell">
      {props.daynumber}
      <div>
        <WorkoutDetails
          workout_details={props.workouts}
        />
        <div className="hyperlink-button">
          <Workout />
        </div>
      </div>
    </td>
  )
}

export default Day
// export default connect(mapStateToProps)(DayCell);
