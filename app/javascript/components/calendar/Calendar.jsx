// @flow
import React from "react";
import DayCell from "./components/DayCell"

const workouts = [ { name: "EMOM", day_number: 1 }, { name: "EMOM", day_number: 2 } ]

function Head() {
  const daysoftheweek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  var header = []
  daysoftheweek.map(day => {
    header.push(
      <th key={day} className="header-cell">
        {day}
      </th>
    )
  })

  return <thead><tr>{header}</tr></thead>
}

function Row(props) {
  const numberofdaysinweek = 7
  var cells = []

  for (var i = 0; i < numberofdaysinweek; i++) {
    const weekDayNumber = i + 1
    const day_workouts = workouts.filter(workout => workout.day_number == weekDayNumber)
    const workoutDayNumber = weekDayNumber + (7*props.weekNumber)

    cells.push(
      <DayCell
        key = {workoutDayNumber}
        dayNumber={workoutDayNumber}
        workouts={day_workouts}
      />
    )
  }

  return <tr>{cells}</tr>
}

function Body() {
  const programlength = 1
  var rows = []

  for (var i = 0; i < programlength; i++) {
    let weekNumber = i
    rows.push(<Row key = {weekNumber} weekNumber = {weekNumber}/>)
  }

  return <tbody>{rows}</tbody>
}

export default () => (
  <table className="calendar">
    <Head />
    <Body />
  </table>
)
