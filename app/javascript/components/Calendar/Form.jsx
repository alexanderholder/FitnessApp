// @flow
import React, { useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect }  from 'react-redux'
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import arrayMove from 'array-move'
import { sortBy } from "lodash"
import * as Selectors from 'javascript/redux/selectors'
import BlockWrapper from './BlockForm'
import { updateWorkout, removeWorkout } from 'javascript/redux/reducers/workoutsSlice'
import { saveNewBlock, updateBlock } from 'javascript/redux/reducers/blocksSlice'
import Close from '@material-ui/icons/Close'
import Delete from '@material-ui/icons/Delete'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import ExcerciseDetails from './ExcerciseDetails'

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

function WorkoutForm(props) {
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
    <div
      ref={props.ref}
      class="p-2 mx-auto bg-white rounded-xl shadow-md items-center space-x-4 fixed inline-block"
    >
      <div
        ref={props.ref}
        onMouseEnter={() => props.view === 'Session' && setMenuShown(true)}
        onMouseLeave={() => props.view === 'Session' && setMenuShown(false)}
      >
       {props.view === 'Session' && <TextField
          autoFocus={true}
          id="workout-name"
          label="Session Name"
          onChange={handleChange}
          onFocus={e => e.target.select()}
          value={workoutName}
          width="300"
        />}
        {(menuShown || (workoutName && props.blocks.length === 0)) && (
          <Tooltip title="Delete workout">
            <IconButton onClick={props.deleteWorkout}>
              <Delete />
            </IconButton>
          </Tooltip>
        )}
        {(menuShown || (workoutName && props.blocks.length === 0)) && (
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
        { props.view === 'Session' && <Tooltip title="Close window">
          <IconButton
            onClick={() => props.setAnchorEl(null)}
            style={{ float: 'right', marginRight: '5px' }}
          >
            <Close />
          </IconButton>
        </Tooltip>}
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
          <ExcerciseDetails
            excerciseId={showExcerciseDetails}
            setShowExcerciseDetails={setShowExcerciseDetails}
          />
        )}
      </div>
      <div
        className="hyperlink-button"
        onClick={props.addBlock}
      >
        { props.view != 'Excercise' && "+ Add Block" }
      </div>
    </div>
  )
}

WorkoutForm.propTypes = {
  workoutId: PropTypes.number.isRequired,
  workout: PropTypes.object.isRequired,
  blocks: PropTypes.array.isRequired,
  setAnchorEl: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  workout: Selectors.getWorkoutById(state, ownProps.workoutId),
  blocks: Selectors.getBlocksByWorkoutId(state, ownProps.workoutId),
  view: state.user.selected_view,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateWorkout: (payload) => dispatch(updateWorkout(ownProps.workoutId, payload)),
  addBlock: () => dispatch(saveNewBlock({ workout_id: ownProps.workoutId, })),
  deleteWorkout: () => dispatch(removeWorkout(ownProps.workoutId)),
  updateBlock: (id, payload) => dispatch(updateBlock(id, payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutForm)
