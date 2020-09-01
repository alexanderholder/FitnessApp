import React from "react";
import { Link } from "react-router-dom";

import SimplePopover from "./Button"

class NewWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      clicked: !state.clicked
    }));
  }

  render() {
    return (
      <div class="hyperlink-button" onClick={this.handleClick}>
        {/* {this.state.clicked ? "creating..." : "+ New Workout"} */}
        <SimplePopover />
      </div>
    )
  }
}

function WorkoutDetails() {
  var workoutsperday = 0
  var workouts = []
  if (workoutsperday > 0) {
    for (var i = 0; i < workoutsperday; i++) {
      workouts.push(<div>Workout</div>)
    }
  } else {
    workouts.push(<NewWorkout />)
  }

  return workouts
}

class DayCell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <td key={this.props.daynumber} className="cell">
        {this.props.daynumber}
        <WorkoutDetails />
      </td>
    );
  }
}

function Head() {
  const daysoftheweek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  var header = []
  daysoftheweek.map((day) => header.push(<th key={day} className="header-cell">{day}</th>))

  return <thead><tr>{header}</tr></thead>
}

function Row(props) {
  const numberofdaysinweek = 7
  var cells = []
  for (var i = 0; i < numberofdaysinweek; i++) {
    cells.push(<DayCell daynumber={(i+1) + (7*props.weeknumber)}/>)
  }

  return <tr>{cells}</tr>
}

function Body() {
  const programlength = 7

  var rows = []
  for (var i = 0; i < programlength; i++) {
    rows.push(<Row weeknumber = {i}/>)
  }

  return <tbody>{rows}</tbody>
}

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {highlighedcell: true};
  }

  render() {
    return (
      <div>
        <h2>Workout Calendar</h2>
        <table>
          <Head />
          <Body />
        </table>
      </div>
    );
  }
}

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <Calendar />
      </div>
    </div>
  </div>
);