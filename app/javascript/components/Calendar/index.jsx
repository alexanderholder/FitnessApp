// @flow
import React       from "react"
import Redux       from "redux"
import PropTypes   from 'prop-types'
import { connect } from "react-redux"
import Week        from "./components/Week"

const Calendar = (props) => {
  console.log(props.template)
  const daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  const TableRows = () => {
    const rows = []
    for(var i = 0; i < props.template_length; i++) {
      rows.push(
        <Week
          key={i + 1}
          weekNumber={i}
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

const mapStateToProps = (state, ownProps) => ({
  template_length: state.template.length
})

Calendar.propTypes = {
  template_length: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(Calendar)
