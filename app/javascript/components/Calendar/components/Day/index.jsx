// @flow
import React, { useState } from "react"
import Redux from "redux"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import WorkoutCardWrapper from "../Workout/views/WorkoutCardWrapper"
import { saveNewWorkout } from 'javascript/redux/reducers/workoutsSlice'
import WindowState from 'javascript/windowState'

const Day = props => {
  const [isShown, setIsShown] = useState(false)
  const [dragOverIsShown, setDragOverIsShown] = useState(false)
  const handleClick = () => {
    props.addWorkout({
      name: "unnamed session",
      day_number: props.dayNumber,
      training_template_id: props.trainingTemplateId
    })
    setIsShown(false)
  }
  const handleDragEnter = (e) => {
    WindowState.hovered_day = props.dayNumber
    setDragOverIsShown(true)
    e.stopPropagation()
    e.preventDefault()
  }
  const handleMouseEnter = () => {
    WindowState.hovered_day = props.dayNumber
    setIsShown(true)
  }
  const handleMouseLeave = () => {
    WindowState.hovered_day = null
    setIsShown(false)
  }

  return (
    <td
      className="cell"
      key={props.dayNumber}
      onDragEnter={handleDragEnter}
      onDragLeave={() => setDragOverIsShown(false)}
      onDragOver={() => setIsShown(false)}
      onDrop={() => setDragOverIsShown(false)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      { props.dayNumber }
      <WorkoutCardWrapper
        dayNumber={props.dayNumber}
        key={props.dayNumber}
        setIsShown={setIsShown}
      />
      { dragOverIsShown && (
        <div
          className='workout-element-outline'
          onDrop={() => setDragOverIsShown(false)}
          onDragLeave={() => setDragOverIsShown(false)}
          onDragEnter={handleDragEnter}
        />
      )}
      { isShown && (
        <div
          className="hyperlink-button"
          onClick={handleClick}
        >
          + New Session
        </div>
      )}
    </td>
  )
}

Day.propTypes = {
  dayNumber: PropTypes.number.isRequired,
  trainingTemplateId: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  trainingTemplateId: state.user.selected_template
})

const mapDispatchToProps = dispatch => ({
  addWorkout: (initialWorkout) => dispatch(saveNewWorkout(initialWorkout))
})

export default connect(mapStateToProps, mapDispatchToProps)(Day)
