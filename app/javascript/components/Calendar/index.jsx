// @flow
import React       from "react"
import Redux       from "redux"
import PropTypes   from 'prop-types'
import { connect } from "react-redux"
import Week        from "./components/Week"
import * as Selectors from '../../redux/selectors';

const Calendar = (props) => {
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

const mapStateToProps = state => ({
  template_length: Selectors.getTemplateById(state, state.user.selected_template).length
})

Calendar.propTypes = {
  template_length: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(Calendar)
