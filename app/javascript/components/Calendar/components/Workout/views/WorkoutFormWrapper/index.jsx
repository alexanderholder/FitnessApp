// @flow
import React, { useState }  from "react"
import Redux                from "redux"
import PropTypes            from "prop-types"
import { connect }          from "react-redux"
import * as Selectors       from "../../../../selectors"
import TextField            from "@material-ui/core/TextField"
import WorkoutForm          from "../../components/WorkoutForm"

const WorkoutFormWrapper = (props) => {
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
        // onClick={() => setExcerciseCount(excerciseCount + 1)} TODO fix this
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
