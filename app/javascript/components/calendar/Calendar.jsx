// @flow
import React from "react";
import DayCell from "./DayCell"

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

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h2>Workout Calendar</h2>
        <table>
          <Head />
          <Body />
        </table>
      </div>
    </div>
  </div>
);