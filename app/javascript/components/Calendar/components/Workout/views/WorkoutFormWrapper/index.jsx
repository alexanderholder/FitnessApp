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
import { Close, Delete, Favorite, FavoriteBorder } from '@material-ui/icons'
import { IconButton, Tooltip, TextField } from '@material-ui/core'

import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

const SortableItem = SortableElement(({block, workoutId, setShowExcerciseDetails}) => (
  <BlockWrapper
    blockId={block.id}
    key={block.id}
    workoutId={workoutId}
    setShowExcerciseDetails={setShowExcerciseDetails}
  />
))

const SortableList = SortableContainer(({blocks, workoutId, setShowExcerciseDetails}) => {
  const collection = useMemo(() => sortBy(blocks, b => b.order))

  return (
    <div className='grabbable'>
      {collection.map((block, index) => (
        <SortableItem
          collection={collection}
          block={block}
          index={index}
          key={block.id}
          workoutId={workoutId}
          setShowExcerciseDetails={setShowExcerciseDetails}
        />
      ))}
    </div>
  )
})

function WorkoutFormWrapper(props) {
  const [workoutName, setWorkoutName] = useState(props.workout.name)
  const [favourite, setFavourite] = useState(props.workout.favourite)
  const [menuShown, setMenuShown] = useState(false)
  const [showExcerciseDetails, setShowExcerciseDetails] = useState(false)

  const onSortEnd = useCallback(({ oldIndex, newIndex, collection }) => {
    const newOrder = arrayMove(collection, oldIndex, newIndex)
    newOrder.map((block, index) => {
      props.updateBlock(block.id, { order: index })
    })
  })

  const handleFavourite = () => {
    setFavourite(!favourite)
    props.updateWorkout({ favourite: !favourite })
  }

  const handleChange = (e) => {
    setWorkoutName(e.target.value)
    props.updateWorkout({ name: e.target.value })
  }

  return (
    <div className="workout-form">
      <div
        onMouseEnter={() => setMenuShown(true)}
        onMouseLeave={() => setMenuShown(false)}
      >
        <TextField
          autoFocus={true}
          id="workout-name"
          label="Session Name"
          onChange={handleChange}
          onFocus={e => e.target.select()}
          value={workoutName}
          width="300"
        />
        {menuShown && (
          <Tooltip title="Delete workout">
            <IconButton onClick={props.deleteWorkout}>
              <Delete />
            </IconButton>
          </Tooltip>
        )}
        {menuShown && (
          favourite ? (
            <Tooltip title="Remove session from side bar">
              <IconButton onClick={handleFavourite}>
                <Favorite />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Add session to side bar">
              <IconButton onClick={handleFavourite}>
                <FavoriteBorder />
              </IconButton>
            </Tooltip>
          )
        )}
        <Tooltip title="Close window">
          <IconButton
            onClick={() => props.setAnchorEl(null)}
            style={{ float: 'right', marginRight: '5px' }}
          >
            <Close />
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <div
          id='workout-wrapper'
          style={{ paddingTop: '10px', display: 'inline-block' }}
        >
          <SortableList
            blocks={props.blocks}
            distance={1}
            onSortEnd={onSortEnd}
            workoutId={props.workoutId}
            setShowExcerciseDetails={setShowExcerciseDetails}
          />
        </div>
        {showExcerciseDetails && (
          <div
            // className='block-wrapper'
            style={{
              marginLeft: '20px',
              boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
              display: 'inline-block',
              cursor: 'default',
              position: 'fixed',
              backgroundColor: 'white'
            }}
          >
            <List style={{padding: '15px'}}>
              {['weight', 'sets & reps', 'intensity', 'soemthing else'].map(metric =>
                <ListItemText primary={
                  <TextField
                    // id="weight-text-box"
                    label={metric}
                    margin="dense"
                    type="text"
                  />
                }/>
              )}
            </List>
          </div>
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
  workoutId: PropTypes.number.isRequired,
  workout: PropTypes.object.isRequired,
  blocks: PropTypes.array.isRequired,
  open: PropTypes.string, // TODO: confirm we dont actually need this as required (undefined vs false)
  setAnchorEl: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  workout: Selectors.getWorkoutById(state, ownProps.workoutId),
  blocks: Selectors.getBlocksByWorkoutId(state, ownProps.workoutId),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateWorkout: (payload) => dispatch(updateWorkout(ownProps.workoutId, payload)),
  addBlock: () => dispatch(saveNewBlock({ workout_id: ownProps.workoutId, style: 'Fixed' })),
  deleteWorkout: () => dispatch(removeWorkout(ownProps.workoutId)),
  updateBlock: (id, payload) => dispatch(updateBlock(id, payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutFormWrapper)
