// @flow
import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { saveNewWorkout } from 'javascript/redux/reducers/workoutsSlice'
import WindowState from 'javascript/windowState'
import * as Selectors from 'javascript/redux/selectors'
import WorkoutCard from './components/WorkoutCard'

function WorkoutCardWrapper(props) {
  if (props.workouts.length === 0) { return [] }
  else if (props.blocks.length === 1) {
    return (
      props.excercises.map((excercise) =>
        <WorkoutCard
          className="handle" // TODO: is this needed?
          isBlock="true"
          key={excercise.id}
          setIsShown={props.setIsShown}
          excerciseId={excercise.id}
          workoutId={props.workouts[0].id}
        />
      )
    )
  } else if (props.workouts.length === 1) {
    return (
      props.blocks.map((block) =>
        <WorkoutCard
          className="handle" // TODO: is this needed?
          isBlock="true"
          key={block.id}
          setIsShown={props.setIsShown}
          blockId={block.id}
          workoutId={props.workouts[0].id}
        />
      )
    )
  } else if (props.workouts.length < 5) {
    // TODO sort_by
    return (
      props.workouts.map(workout =>
        <WorkoutCard
          className="handle" // TODO: is this needed?
          key={workout.id}
          setIsShown={props.setIsShown}
          workoutId={workout.id}
        />
      )
    )
  } else {
    return (
      <>
        {props.workouts.map(workout =>
          <WorkoutCard
            key={workout.id}
            setIsShown={props.setIsShown}
            workoutId={workout.id}
          />
        )}
        <div>Show More</div>
      </>
    )
  }
}

function Day (props) {
  const [isShown, setIsShown] = useState(false)
  const [dragOverIsShown, setDragOverIsShown] = useState(false)
  const handleClick = () => {
    props.addWorkout({
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
        workouts={props.workouts}
        blocks={props.blocks}
        excercises={props.excercises}
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
          {props.workouts.length > 1 ? "+ New Session" : "+ New Block"}
        </div>
      )}
    </td>
  )
}

Day.propTypes = {
  dayNumber: PropTypes.number.isRequired,
}

WorkoutCardWrapper.propTypes = {
  workouts: PropTypes.array.isRequired,
  setIsShown: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const trainingTemplateId = state.user.selected_template
  const workouts = Selectors.getWorkoutsByDayNumberFilter(state, ownProps.dayNumber)
  const blocks = workouts.length === 1 ? Selectors.getBlocksByWorkoutId(state, workouts[0].id) : []
  const excercises = blocks.length === 1 ? Selectors.getExcercisesByBlockId(state, blocks[0].id) : []

  return { trainingTemplateId, workouts, blocks, excercises }
}

const mapDispatchToProps = dispatch => ({
  addWorkout: (initialWorkout) => dispatch(saveNewWorkout(initialWorkout)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Day)
