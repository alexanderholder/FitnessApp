// @flow
import React          from "react"
import Redux          from "redux"
import PropTypes      from 'prop-types'
import { connect }    from "react-redux"
import WorkoutCards   from "../WorkoutCards"
import WorkoutCard    from "../WorkoutCard"

const Day = (props) => {
  return (
    <td key={props.dayNumber} className="cell">
      {props.dayNumber}
      <div>
        <WorkoutCards
          dayNumber={props.dayNumber}
        />
        <div className="hyperlink-button">
          <WorkoutCard />
        </div>
      </div>
    </td>
  )
}

Day.propTypes = {
  dayNumber: PropTypes.number.isRequired
}

export default connect()(Day)
