// @flow
import React                    from "react"
import Redux                    from "redux"
import { connect, useSelector } from "react-redux"
import Day                      from '../Day'

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

export default connect()(Week)
