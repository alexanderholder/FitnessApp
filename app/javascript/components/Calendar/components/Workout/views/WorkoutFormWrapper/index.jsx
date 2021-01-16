// @flow
import React, { useState } from 'react'
import Redux from 'redux'
import PropTypes from 'prop-types'
import { connect }  from 'react-redux'
import * as Selectors from 'javascript/redux/selectors'
import TextField from '@material-ui/core/TextField'
import BlockWrapper from '../BlockWrapper'
import { saveWorkoutName, removeWorkout } from 'javascript/redux/reducers/workoutsSlice'
import { saveNewBlock } from 'javascript/redux/reducers/blocksSlice'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'

const WorkoutFormWrapper = (props) => {
  const [workoutName, setWorkoutName] = useState(props.workout.name)
  // const [rounds, setRounds] = useState(props.workout.name)

  return (
    <div className="workout-form">
      <TextField
        autoFocus={true}
        id="workout-name"
        label="Session Name"
        onBlur={() => props.updateWorkoutName(workoutName)}
        onChange={e => setWorkoutName(e.target.value)}
        onFocus={e => e.target.select()}
        value={workoutName}
      />
      <Tooltip title="Delete workout">
        <IconButton onClick={props.deleteWorkout} >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Close window">
        <IconButton style={{ float: 'right', marginRight: '5px' }}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
      <div
        id='workout-wrapper'
        style={{ paddingTop: '10px' }}
      >
        {props.blocks.map(block =>
          <BlockWrapper
            key={block.id}
            workout_id={props.workout.id}
            block_id={block.id}
          />
        )}
      </div>
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
  addBlock: () => dispatch(saveNewBlock({ workout_id: ownProps.workout_id, style: 'Fixed' })),
  deleteWorkout: () => dispatch(removeWorkout(ownProps.workout_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutFormWrapper)
