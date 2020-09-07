import React from "react";
import NewWorkout from "./WorkoutItem"

function WorkoutDetails() {
  var workoutsperday = 1
  var workouts = []
  if (workoutsperday > 0) {
    for (var i = 0; i < workoutsperday; i++) {
      workouts.push(<div className="workout-div">Leg Workout</div>)
      workouts.push(<NewWorkout />)
    }
  } else {
    workouts.push(<NewWorkout />)
  }

  return workouts
}

export default class DayCell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <td key={this.props.daynumber} className="cell cell:hover">
        {this.props.daynumber}
        <WorkoutDetails />
      </td>
    );
  }
}