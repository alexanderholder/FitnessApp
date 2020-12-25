// @flow
import React, { useState }  from 'react'
import Redux                from 'redux'
import PropTypes            from 'prop-types'

import * as Selectors       from '../../../../../../redux/selectors'

import TextField            from '@material-ui/core/TextField'
import BlockWrapper         from '../BlockWrapper'

import { connect, useDispatch }  from 'react-redux'

const WorkoutFormWrapper = (props) => {
  const [workoutName, setWorkoutName] = useState(props.workout.name)
  const dispatch = useDispatch()

  return (
    <div className="workout-form">
      <TextField
        d="standard-basic"
        label="Workout Name"
        value={workoutName}
        onKeyUp={e =>
          dispatch({
            type: 'workouts/workoutNameChanged',
            payload: {
              id: props.workout.id,
              name: e.target.value.trim()
            }
          })
        }
        onChange={e => setWorkoutName(e.target.value)}
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
        onClick={() =>
          dispatch({
            type: 'blocks/blockAdded',
            payload: { id: props.workout_id }
          })
        }
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

export default connect(mapStateToProps)(WorkoutFormWrapper)
