import React from "react";
import { Link } from "react-router-dom";

class NewWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      showForm: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      clicked: !state.clicked,
      showForm: true
    }));
  }

  render() {
    const { showForm } = this.state;

    return (
      // this.renderForm()
      <div onClick={this.handleClick}>
        {this.state.clicked ? "creating" : '+ New Workout'}
        {/* {showForm && this.renderForm()} */}
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
    this.state = {isCellHighlighted: false};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isCellHighlighted: !state.isCellHighlighted
    }));
  }

  render() {
    return (
      <td onClick={this.handleClick} key={this.props.daynumber} className="cell">
        <h3>{this.props.daynumber}</h3>
        {/* {this.state.isCellHighlighted ? 'ON' : 'OFF'} */}
        <WorkoutDetails />
      </td>
    );
  }
}

function Head() {
  const daysoftheweek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  var header = []
  daysoftheweek.map((day) => header.push(<th key={day} className="cell">{day}</th>))

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
        <h2>Calendar</h2>
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