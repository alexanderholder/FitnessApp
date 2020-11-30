// @flow
import React from "react"
import Redux from "redux"
import { connect } from "react-redux";
import DayCell from "./components/DayCell"

const mapStateToProps = (state, ownProps) => ({
  workouts: state.template_workouts,
  template_length: state.template_length
})

function DayNameCell(props) {
  const day = props.day

  return(
    <th
      key={day}
      className="header-cell"
    >
      {day}
    </th>
  )
}

function Head() {
  const daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  return (
    <thead>
      <tr>
        {daysOfTheWeek.map(day => <DayNameCell day={day} key={day} />)}
      </tr>
    </thead>
  )
}

function Row(props) {
  const numberofdaysinweek = 7
  var cells = []

  for (var i = 0; i < numberofdaysinweek; i++) {
    const weekDayNumber = i + 1
    const day_workouts = props.workouts.filter(workout => workout.day_number == weekDayNumber)
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

function Body(props) {
  const programLength = props.template_length
  const rows = []

  for (let i=0; i<programLength; i++) {
    const weekNumber = i
    rows.push(
      <Row
        key={weekNumber}
        weekNumber={weekNumber}
        workouts={props.workouts}
      />
    )
  }

  return <tbody>{rows}</tbody>
}

function Calendar (props) {
  return (
    <table className="calendar">
      <Head />
      <Body
        template_length={props.template_length}
        workouts={props.workouts}
      />
    </table>
  )
}

const mapDispatchToProps = {
  // ... normally is an object full of action creators
}

export default connect(mapStateToProps)(Calendar);