// @flow
import React from "react";
import DayCell from "./components/DayCell"

const workoutExcercises = ["Clean & Jerk", "Snatch"]
const workouts = [
  { name: "EMOM", day_number: 1, excercises: workoutExcercises },
  { name: "EMOM", day_number: 2, excercises: workoutExcercises }
]

function Head() {
  const daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const formatedDaysOfTheWeek = []
  daysOfTheWeek.map(day => {
    formatedDaysOfTheWeek.push(
      <th
        key={day}
        className="header-cell"
      >
        {day}
      </th>
    )
  })

  const header =
    <thead>
      <tr>
        {formatedDaysOfTheWeek}
      </tr>
    </thead>

  return header
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
