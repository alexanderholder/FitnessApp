// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Selectors from 'javascript/redux/selectors'
import Day from './Day'

const NUMBER_OF_DAYS_IN_WEEK = 7

const Week = (props) => {
  let cells = []
  for (let i = 0; i < NUMBER_OF_DAYS_IN_WEEK; i++) {
    const workoutDayNumber = (i + 1) + (NUMBER_OF_DAYS_IN_WEEK * props.weekNumber)

    cells.push(
      <Day
        key = {workoutDayNumber}
        dayNumber={workoutDayNumber}
      />
    )
  }

  return <tr>{cells}</tr>
}

const Calendar = (props) => {
  const daysOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const TableRows = () => {
    const rows = []
    for(var i = 0; i < props.templateLength; i++) {
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
    <table className='calendar'>
      <thead>
        <tr>
          {daysOfTheWeek.map(day =>
            <th key={day} className='header-cell'>
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
  templateLength: Selectors.getTemplateById(state, state.user.selected_template).length
})

Calendar.propTypes = {
  templateLength: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(Calendar)
