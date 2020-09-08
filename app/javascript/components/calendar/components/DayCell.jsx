import React from "react";
import WorkoutPopover from "../../workout/WorkoutPopover"

function WorkoutDetails() {
  var workoutsperday = 5
  var workouts = []
  if (workoutsperday > 0) {
    if (workoutsperday < 5) {
      for (var i = 0; i < workoutsperday; i++) {
        workouts.push(
          <div className="workout-element">
            <WorkoutPopover name="AB Rollout"/>
          </div>
        )
      }
    } else {
      for (var i = 0; i < 4; i++) {
        workouts.push(
          <div className="workout-element">
            <WorkoutPopover name="AB Rollout"/>
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
        <div>
          <WorkoutDetails />
          <div className="hyperlink-button">
            <WorkoutPopover />
          </div>
        </div>
      </td>
    );
  }
}