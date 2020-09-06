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
  <table>
    <Head />
    <Body />
  </table>
)
