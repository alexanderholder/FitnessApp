// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Selectors from 'javascript/redux/selectors'
import Day from './Day'
import TextField from '@material-ui/core/TextField';

const NUMBER_OF_DAYS_IN_WEEK = 7
const daysOfTheWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

function Calendar(props) {
  const [search, setSearch] = React.useState('')

  const Week = ({weekNumber, day}) => {
    const cells = []
    let i
    if (day) {
      const dayNumber = daysOfTheWeek.indexOf(day)

      for (i = 0; i < props.templateLength; i++) {
        const workoutDayNumber = dayNumber + 1 + (i * NUMBER_OF_DAYS_IN_WEEK)

        cells.push(
          <Day
            key = {workoutDayNumber}
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
            key = {workoutDayNumber}
            dayNumber={workoutDayNumber}
          />
        )
      }
    }

    return <tr>{cells}</tr>
  }

  const TableRows = () => {
    const rows = []

    if (daysOfTheWeek.includes(search)) {
      rows.push(
        <Week
          key={search}
          day={search}
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
    if (daysOfTheWeek.includes(search)) {
      let i
      const headerRow = []
      for (i = 0; i < props.templateLength; i++) {
        headerRow.push(<th key={`${search} i`} className='header-cell'>{search}</th>)
      }
      return headerRow
    }
    else {
      return daysOfTheWeek.map(day => <th key={day} className='header-cell'>{day}</th>)
    }
  }

  return (
    <>
    <TextField
      label="Search"
      style={{ boder: 5, paddingRight: 5, }}
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
    <table className='calendar'>
      <thead>
        <tr>
          <TableHeader />
        </tr>
      </thead>
      <tbody>
        <TableRows />
      </tbody>
    </table>
    </>
  )
}

const mapStateToProps = state => ({
  templateLength: Selectors.getTemplateById(state, state.user.selected_template).length
})

Calendar.propTypes = {
  templateLength: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(Calendar)
