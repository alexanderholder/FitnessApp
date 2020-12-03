// @flow
import React                    from "react"
import Redux                    from "redux"
import { connect, useSelector } from "react-redux"
import Week                     from "./components/Week"

const mapStateToProps = (state, ownProps) => ({
  workouts: state.template_workouts,
  template_length: state.template_length
})

const Calendar = (props) => {
  const daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  const TableRows = () => {
    const rows = []
    for(var i = 0; i < props.template_length; i++) {
      rows.push(
        <Week
          key={i + 1}
          weekNumber={i + 1}
          workouts={props.workouts}
        />
      )
    }
    return rows
  }

  return (
    <table className="calendar">
      <thead>
        <tr>
          {daysOfTheWeek.map(day =>
            <th key={day} className="header-cell">
              {day}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        <TableRows />
      </tbody>
    </table>
  )
}

const mapDispatchToProps = {
  // ... normally is an object full of action creators
}

export default connect(mapStateToProps)(Calendar)