import React from "react";
import SimplePopover from "../../excercise/Excercise"

function WorkoutDetails() {
  var workoutsperday = 1
  var workouts = []
  if (workoutsperday > 0) {
    if (workoutsperday < 5) {
      for (var i = 0; i < workoutsperday; i++) {
        workouts.push(
          <div className="workout-element">
            <SimplePopover name="Leg Workout"/>
          </div>
        )
      }
    } else {
      for (var i = 0; i < 4; i++) {
        workouts.push(
          <div className="workout-element">
            Leg Workout
          </div>
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
        <div className="hyperlink-button">
          <WorkoutDetails />
          <SimplePopover />
        </div>
      </td>
    );
  }
}