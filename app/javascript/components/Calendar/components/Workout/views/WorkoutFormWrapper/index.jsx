// @flow
import React, { useState }  from "react"
import Redux                from "redux"
import PropTypes            from "prop-types"
import * as Selectors       from "../../../../../../redux/selectors"
import TextField            from "@material-ui/core/TextField"
import WorkoutForm          from "../../components/WorkoutForm"

import { connect, useDispatch, useSelector }  from 'react-redux'

const WorkoutFormWrapper = (props) => {
  const [workoutName, setWorkoutName] = useState(props.workout.name)
  const dispatch = useDispatch()

  const handleChange = e => setWorkoutName(e.target.value)

  const handleKeyUp = e => {
    const trimmedText = e.target.value.trim()

    // if (trimmedText) { TODO: this will break without the trimmed text however it wont feel nice
    dispatch({
      type: 'workouts/workoutNameChanged',
      payload: {
        id: props.workout.id,
        name: workoutName
      }
    })
    // }
  }

  return (
    <div className="workout-form">
      <TextField
        d="standard-basic"
        label="Workout Name"
        value={workoutName}
        onKeyUp={handleKeyUp}
        onChange={handleChange}
      />
      {props.excercises.map(excercise =>
        <WorkoutForm
          key={excercise.id}
          excercise_id={excercise.id}
          workout_id={props.workout.id}
        />
      )}
      <br/>
      <div
        className="hyperlink-button"
        onClick={() =>
          dispatch({
            type: 'excercises/excerciseAdded',
            payload: { id: props.workout.id }
          })
        }
      >
        + Add Excercise
      </div>
    </div>
  )
}

WorkoutFormWrapper.propTypes = {
  workout_id: PropTypes.number.isRequired,
  workout: PropTypes.object.isRequired,
  excercises: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const workout = Selectors.getWorkoutById(state, ownProps.workout_id)
  const block_ids = Selectors.getBlocksByWorkoutId(state, ownProps.workout_id).map(block => block.id)
  const excercises = Selectors.getExcercisesByBlockIds(state, block_ids)
  return { workout, excercises }
}

export default connect(mapStateToProps)(WorkoutFormWrapper)
