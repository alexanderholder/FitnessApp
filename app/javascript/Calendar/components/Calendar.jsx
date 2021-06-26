import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Selectors from '../redux/selectors'
import Day from './Day'

const NUMBER_OF_DAYS_IN_WEEK = 7
const DAYS_OF_THE_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function Calendar(props) {
  const Week = ({weekNumber, day}) => {
    const cells = []
    let i

    if (day) {
      const dayNumber = DAYS_OF_THE_WEEK.indexOf(day)

      for (i = 0; i < props.templateLength; i++) {
        const workoutDayNumber = dayNumber + 1 + (i * NUMBER_OF_DAYS_IN_WEEK)

        cells.push(
          <Day
            key={workoutDayNumber}
            dayNumber={workoutDayNumber}
          />
        )
      }
    }
    else {
      for (i = 0; i < NUMBER_OF_DAYS_IN_WEEK; i++) {
        const workoutDayNumber = (i + 1) + (NUMBER_OF_DAYS_IN_WEEK * weekNumber)

        cells.push(
          <Day
            key={workoutDayNumber}
            dayNumber={workoutDayNumber}
          />
        )
      }
    }

    return <tr>{cells}</tr>
  }

  const TableRows = () => {
    const rows = []

    if (DAYS_OF_THE_WEEK.includes(props.search)) {
      rows.push(
        <Week
          key={props.search}
          day={props.search}
        />
      )
    }
    else {
      for(var i = 0; i < props.templateLength; i++) {
        rows.push(
          <Week
            key={i + 1}
            weekNumber={i}
          />
        )
      }
    }

    return rows
  }

  const TableHeader = () => {
    if (DAYS_OF_THE_WEEK.includes(props.search)) {
      const headerRow = []
      let i

      for (i = 0; i < props.templateLength; i++) {
        headerRow.push(
          <th
            key={`${props.search} ${i}`}
            className='text-center border-l border-r text-sm dark:text-gray-200'
          >
            {props.search}
          </th>
        )
      }
      return headerRow
    }
    else {
      return DAYS_OF_THE_WEEK.map(day => <th key={day} className='text-center border-l border-r text-sm dark:text-gray-200'>{day}</th>)
    }
  }

  return (
    <table className={`table-fixed w-full ${props.className}`}>
      <thead>
        <tr>
          <TableHeader />
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
