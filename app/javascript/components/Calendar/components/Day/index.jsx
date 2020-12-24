// @flow
import React, { useState }      from "react"
import Redux                    from "redux"
import PropTypes                from "prop-types"
import { connect, useDispatch } from "react-redux"
import WorkoutCardWrapper       from "../Workout/views/WorkoutCardWrapper"

const Day = (props) => {
  const [isShown, setIsShown] = useState(false)
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch({
      type: 'workouts/workoutAdded',
      payload: {
        name: "unnamed workout",
        day_number: props.dayNumber,
        template_id: props.template_id
      }
    })
  }

  return (
    <td
      key={props.dayNumber}
      className="cell"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      {props.dayNumber}
      <div>
        <WorkoutCardWrapper
          dayNumber={props.dayNumber}
          key={props.dayNumber}
        />
        <div className="hyperlink-button">
          { isShown && (
            <div onClick={handleClick} >
              + New Workout
            </div>
          )}
        </div>
      </div>
    </td>
  )
}

Day.propTypes = {
  dayNumber: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  template_id: state.selected_template
})

export default connect(mapStateToProps)(Day)
