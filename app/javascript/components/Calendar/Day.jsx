// @flow
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { saveNewWorkout } from 'javascript/redux/reducers/workoutsSlice'
import WindowState from 'javascript/windowState'
import * as Selectors from 'javascript/redux/selectors'
import Card from './components/Card'

function CardWrapper(props) {
  const wrapperRef = React.useRef(null);
  const [isShown, setIsShown] = useState(false)

  const handleClick = () => {
    setIsShown(true)
  }

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [wrapperRef])

  if (props.workouts.length === 0) { return [] }
  else if (props.view === 'Excercise') {
    let cards = []

    props.blocks.map((block) =>
      props.excercises.map((excercise) => {
        if (excercise.block_id === block.id) {
          cards.push(
            <Card
              className="handle" // TODO: is this needed?
              key={excercise.id}
              setIsShown={props.setIsShown}
              excerciseId={excercise.id}
              workoutId={block.workout_id}
            />
          )
        }
      })
    )
    return cards
  } else if (props.view === 'Block') {
    return (
      props.blocks.map((block) =>
        <Card
          className="handle" // TODO: is this needed?
          key={block.id}
          setIsShown={props.setIsShown}
          blockId={block.id}
          workoutId={block.workout_id}
        />
      )
    )
  } else if (props.workouts.length < 6) {
    // TODO sort_by
    return (
      props.workouts.map(workout =>
        <Card
          className="handle" // TODO: is this needed?
          key={workout.id}
          setIsShown={props.setIsShown}
          workoutId={workout.id}
        />
      )
    )
  } else {
    let output = []

    props.workouts.map((workout, index) => {
      if (index < 5) {
        output.push(
          <Card
            key={workout.id}
            setIsShown={props.setIsShown}
            workoutId={workout.id}
          />
        )
      }
    })
    if (props.workouts.length > 5) {
      output.push(
        <>
          <div onClick={handleClick}>
            {`${props.workouts.length - 5} more`}
          </div>
          {isShown && (
            <div
              ref={wrapperRef}
              style={{
                // marginLeft: '20px',
                boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
                display: 'inline-block',
                cursor: 'default',
                position: 'fixed',
                backgroundColor: 'white',
                width: '150px',
              }}
            >
              {props.workouts.map((workout, index) =>
                <Card
                  ref={wrapperRef}
                  key={workout.id}
                  setIsShown={props.setIsShown}
                  workoutId={workout.id}
                />
              )}
            </div>
          )}
        </>
      )
    }
    return output
  }
}

function Day(props) {
  const [isShown, setIsShown] = useState(false)
  const [dragOverIsShown, setDragOverIsShown] = useState(false)

  const handleClick = () => {
    props.addWorkout({
      day_number: props.dayNumber,
      training_template_id: props.trainingTemplateId,
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
    if (props.workouts.length < 6 || props.blocks.length < 6 || props.excercises.length < 6) {
      setIsShown(true)
    }
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
      <CardWrapper
        workouts={props.workouts}
        blocks={props.blocks}
        excercises={props.excercises}
        key={props.dayNumber}
        setIsShown={setIsShown}
        view={props.view}
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
          { `+ New ${props.view}` }
        </div>
      )}
    </td>
  )
}

Day.propTypes = {
  dayNumber: PropTypes.number.isRequired,
}

CardWrapper.propTypes = {
  workouts: PropTypes.array.isRequired,
  setIsShown: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const view = state.user.selected_view
  const trainingTemplateId = state.user.selected_template
  const workouts = Selectors.getWorkoutsByDayNumberFilter(state, ownProps.dayNumber)
  const blocks = Selectors.getBlocksByWorkoutIds(state, workouts.map(w => w.id))
  const excercises = Selectors.getExcercisesByBlockIds(state, blocks.map(b => b.id))

  return { trainingTemplateId, workouts, blocks, excercises, view }
}

const mapDispatchToProps = dispatch => ({
  addWorkout: (initialWorkout) => dispatch(saveNewWorkout(initialWorkout)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Day)
