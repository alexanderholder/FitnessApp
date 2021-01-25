// @flow
import React, { useState, useMemo, useCallback } from 'react'
import Redux from 'redux'
import PropTypes from 'prop-types'
import { connect }  from 'react-redux'
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import arrayMove from 'array-move'
import { sortBy } from "lodash"
import * as Selectors from 'javascript/redux/selectors'
import BlockWrapper from '../BlockWrapper'
import { updateWorkout, removeWorkout } from 'javascript/redux/reducers/workoutsSlice'
import { saveNewBlock, updateBlock } from 'javascript/redux/reducers/blocksSlice'
import { Close, Delete } from '@material-ui/icons'
import { IconButton, Tooltip, TextField } from '@material-ui/core'

const SortableItem = SortableElement(({block, workoutId}) => (
  <BlockWrapper
    blockId={block.id}
    key={block.id}
    workoutId={workoutId}
  />
))

const SortableList = SortableContainer(({blocks, workoutId}) => {
  const collection = useMemo(() => sortBy(blocks, b => b.order))

  return (
    <div className='grabbable'>
      {collection.map((block, index) => (
        <SortableItem
          block={block}
          index={index}
          key={block.id}
          workoutId={workoutId}
        />
      ))}
    </div>
  )
})

const WorkoutFormWrapper = (props) => {
  const [workoutName, setWorkoutName] = useState(props.workout.name)

  const onSortEnd = useCallback(({ oldIndex, newIndex, collection }) => {
    const newOrder = arrayMove(collection, oldIndex, newIndex)
    newOrder.map((block, index) => {
      props.updateBlock(block.id, { order: index })
    })
  })

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
        width="300"
      />
      <Tooltip title="Delete workout">
        <IconButton onClick={props.deleteWorkout} >
          <Delete />
        </IconButton>
      </Tooltip>
      <Tooltip title="Close window">
        <IconButton
          onClick={() => props.setAnchorEl(null)}
          style={{ float: 'right', marginRight: '5px' }}
        >
          <Close />
        </IconButton>
      </Tooltip>
      <div
        id='workout-wrapper'
        style={{ paddingTop: '10px' }}
      >
        <SortableList
          blocks={props.blocks}
          distance={1}
          onSortEnd={onSortEnd}
          workoutId={props.workoutId}
        />
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
  workoutId: PropTypes.number.isRequired,
  workout: PropTypes.object.isRequired,
  blocks: PropTypes.array.isRequired,
  open: PropTypes.string, // TODO: confirm we dont actually need this as required
  setAnchorEl: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  workout: Selectors.getWorkoutById(state, ownProps.workoutId),
  blocks: Selectors.getBlocksByWorkoutId(state, ownProps.workoutId)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateWorkoutName: (name) => dispatch(updateWorkout(ownProps.workoutId, { name: name })),
  addBlock: () => dispatch(saveNewBlock({ workout_id: ownProps.workoutId, style: 'Fixed' })),
  deleteWorkout: () => dispatch(removeWorkout(ownProps.workoutId)),
  updateBlock: (id, payload) => dispatch(updateBlock(id, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutFormWrapper)
