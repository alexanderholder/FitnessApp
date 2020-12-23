// @flow
import React, { useState }  from "react"
import Redux                from "redux"
import PropTypes            from "prop-types"
import { connect }          from "react-redux"
import WorkoutCardWrapper   from "../Workout/views/WorkoutCardWrapper"

import { useDispatch } from 'react-redux'

const Day = (props) => {
  const [isShown, setIsShown] = useState(false)
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch({
      type: 'workouts/workoutAdded',
      payload: { name: "new workout", day_number: props.dayNumber }
    })
  }

  return (
    <td key={props.dayNumber} className="cell">
      {props.dayNumber}
      <div>
        <WorkoutCardWrapper
          dayNumber={props.dayNumber}
          key={props.dayNumber}
        />
        <div className="hyperlink-button">
          <div
            className="hoverable-area"
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            { isShown && (
              <div onClick={handleClick} >
                + New Workout
              </div>
            )}
          </div>
        </div>
      </div>
    </td>
  )
}

Day.propTypes = {
  dayNumber: PropTypes.number.isRequired
}

export default connect()(Day)
