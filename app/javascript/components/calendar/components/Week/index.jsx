// @flow
import React                    from "react"
import Redux                    from "redux"
import { connect, useSelector } from "react-redux"
import Day from '../Day'

const mapStateToProps = (state, ownProps) => ({
  workouts: state.template_workouts,
})

const Row = (props) => {
  const daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  var cells = []

  for (var i = 0; i < daysOfTheWeek.length; i++) {
    const weekDayNumber = i + 1
    const day_workouts = props.workouts.filter(workout => workout.day_number == weekDayNumber)
    const workoutDayNumber = weekDayNumber + (7*props.weekNumber)

    cells.push(
      <Day
        key = {workoutDayNumber}
        dayNumber={workoutDayNumber}
        workouts={day_workouts}
      />
    )
  }

  return <tr>{cells}</tr>
}

export default connect(mapStateToProps)(Row)
