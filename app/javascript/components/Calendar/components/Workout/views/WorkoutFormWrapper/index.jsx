// @flow
import React, { useState } from 'react'
import Redux from 'redux'
import PropTypes from 'prop-types'
import { connect }  from 'react-redux'
import * as Selectors from '../../../../../../redux/selectors'
import TextField from '@material-ui/core/TextField'
import BlockWrapper from '../BlockWrapper'
import { saveWorkoutName } from '../../../../../../redux/reducers/workoutsSlice'

const WorkoutFormWrapper = (props) => {
  const [workoutName, setWorkoutName] = useState(props.workout.name)

  return (
    <div className="workout-form">
      <TextField
        autoFocus={true}
        id="workout-name"
        label="Workout Name"
        onChange={e => setWorkoutName(e.target.value)}
        value={workoutName}
        onBlur={() => props.updateWorkoutName(workoutName)}
      />
      {props.blocks.map(block =>
        <BlockWrapper
          key={block.id}
          workout_id={props.workout.id}
          block_id={block.id}
        />
      )}
      <div
        className="hyperlink-button"
        onClick={props.addBlock}
      >
        + Add Block
      </div>
    </div>
  )
}

WorkoutFormWrapper.propTypes = {
  workout_id: PropTypes.number.isRequired,
  workout: PropTypes.object.isRequired,
  blocks: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  workout: Selectors.getWorkoutById(state, ownProps.workout_id),
  blocks: Selectors.getBlocksByWorkoutId(state, ownProps.workout_id)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateWorkoutName: (name) => dispatch(saveWorkoutName(ownProps.workout_id, { name: name })),
  addBlock: () => dispatch({ type: 'blocks/blockAdded', payload: { id: ownProps.workout_id } })
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutFormWrapper)
