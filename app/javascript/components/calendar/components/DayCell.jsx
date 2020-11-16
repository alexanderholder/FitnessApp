import React from "react";
import Draggable from 'react-draggable'; // The default
import Workout from "../../workout/Workout";

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
              <Workout
                workoutName={workout_details[i].name}
              />
            </div>
          </Draggable>
        )
      }
    } else {
      for (var i = 0; i < 4; i++) {
        workouts.push(
          <Draggable>
            <div className="workout-element">
              <Workout workoutName={workout_details[i].name}/>
            </div>
          </Draggable>
        )
      }
      workouts.push(<div>Show More</div>)
    }
  }

  return workouts
}

export default class DayCell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <td key={this.props.daynumber} className="cell">
        {this.props.daynumber}
        <div>
          <WorkoutDetails
            key = {this.props.daynumber}
            workout_details={this.props.workouts}
          />
          <div className="hyperlink-button">
            <Workout />
          </div>
        </div>
      </td>
    );
  }
}