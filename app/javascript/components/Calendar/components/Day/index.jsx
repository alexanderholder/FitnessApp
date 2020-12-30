// @flow
import React, { useState }      from "react"
import Redux                    from "redux"
import PropTypes                from "prop-types"
import { connect, useDispatch } from "react-redux"
import WorkoutCardWrapper       from "../Workout/views/WorkoutCardWrapper"

const Day = props => {
  const [isShown, setIsShown] = useState(false)
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch({
      type: 'workouts/workoutAdded',
      payload: {
        name: "unnamed workout",
        day_number: props.dayNumber,
        training_template_id: props.training_template_id
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
      { props.dayNumber }
      <WorkoutCardWrapper
        dayNumber={props.dayNumber}
        key={props.dayNumber}
      />
      { isShown && (
        <div
          className="hyperlink-button"
          onClick={handleClick}
        >
          + New Workout
        </div>
      )}
    </td>
  )
}

Day.propTypes = {
  dayNumber: PropTypes.number.isRequired,
  training_template_id: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  training_template_id: state.user.selected_template
})

export default connect(mapStateToProps)(Day)
