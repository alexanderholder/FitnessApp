// @flow
import React, { useState } from 'react'
import Redux from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Selectors from 'javascript/redux/selectors'
import { saveNewExcercise } from 'javascript/redux/reducers/excercisesSlice'
import { updateBlock, removeBlock } from 'javascript/redux/reducers/blocksSlice'
import ExcerciseForm from '../../components/ExcerciseForm'
import { TextField, IconButton, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const BlockWrapper = props => {
  const [name, setName] = useState(props.block.name)
  const [rounds, setRounds] = useState(props.block.sets)
  const [showBlockDetails, setShowBlockDetails] = useState(props.block.name || props.block.sets)

  return (
    <div className="block-wrapper">
      { showBlockDetails ?
        <div style={{ paddingBottom: "10px"}}>
          <TextField
            autoFocus={true}
            label="Block Name"
            onBlur={() => props.updateBlock({ name: name })}
            onChange={e => setName(e.target.value)}
            size="small"
            value={name}
            width="50"
          />
          <TextField
            label="Block Rounds"
            onBlur={() => props.updateBlock({ sets: rounds })}
            onChange={e => setRounds(e.target.value)}
            size="small"
            value={rounds}
            width="50"
          />
          <Tooltip title="Delete block">
            <IconButton onClick={props.deleteBlock} >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div> :
        <div
          className="hyperlink-button"
          onClick={() => setShowBlockDetails(true)}
        >
          Click to edit block details
        </div>
      }
      {props.excercises.map(excercise =>
        <ExcerciseForm
          key={excercise.id}
          excercise_id={excercise.id}
          block_id={props.block_id}
        />
      )}
      <div
        className="hyperlink-button"
        onClick={props.addExcercise}
      >
        + Add Excercise
      </div>
    </div>
  )
}

BlockWrapper.propTypes = {
  block: PropTypes.object.isRequired,
  block_id: PropTypes.number.isRequired,
  excercises: PropTypes.array.isRequired,
  workout_id: PropTypes.number.isRequired,
  block_count: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  block_count: Selectors.getBlocksByWorkoutId(state, ownProps.workout_id).count,
  block: Selectors.getBlockById(state, ownProps.block_id),
  excercises: Selectors.getExcercisesByBlockId(state, ownProps.block_id)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addExcercise: () => dispatch(saveNewExcercise({ movement: "", block_id: ownProps.block_id })),
  updateBlock: (payload) => dispatch(updateBlock(ownProps.block_id, payload)),
  deleteBlock: () => dispatch(removeBlock(ownProps.block_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(BlockWrapper)
