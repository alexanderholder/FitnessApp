// @flow
import React, { useState }  from "react"
import Redux                from "redux"
import PropTypes            from "prop-types"
import * as Selectors       from "../../../../selectors"
import TextField            from "@material-ui/core/TextField"
import WorkoutForm          from "../../components/WorkoutForm"

import { connect, useDispatch, useSelector }  from 'react-redux'
import { addExcercise } from '../../../../../../redux/reducers/workoutsSlice'

const WorkoutFormWrapper = (props) => {
  const dispatch = useDispatch()

  return (
    <div className="workout-form">
      <TextField
        d="standard-basic"
        label="Block Name"
        value={props.workout.name}
      />
      {props.workout.excercises.map(excercise =>
        <WorkoutForm
          key={excercise.id}
          excercise_id={excercise.id}
          workout_id={props.workout.id}
        />
      )}
      <br/>
      <div
        className="hyperlink-button"
        onClick={() => dispatch(addExcercise(props.workout.id))}
      >
        + Add Excercise
      </div>
    </div>
  )
}

WorkoutFormWrapper.propTypes = {
  workout_id: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const workout = Selectors.getWorkoutById(state, ownProps.workout_id)
  return { workout }
}

export default connect(mapStateToProps)(WorkoutFormWrapper)
