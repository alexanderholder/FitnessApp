// @flow
import React, { useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import arrayMove from 'array-move'
import { sortBy } from "lodash"
import * as Selectors from 'javascript/redux/selectors'
import { saveNewExcercise, updateExcercise } from 'javascript/redux/reducers/excercisesSlice'
import { updateBlock, removeBlock } from 'javascript/redux/reducers/blocksSlice'
import ExcerciseForm from '../../components/ExcerciseForm'
import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Delete from '@material-ui/icons/Delete'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

const SortableItem = SortableElement(({excercise, blockId, setShowExcerciseDetails}) => (
  <ExcerciseForm
    blockId={blockId}
    excerciseId={excercise.id}
    key={excercise.id}
    setShowExcerciseDetails={setShowExcerciseDetails}
  />
))

const SortableList = SortableContainer(({excercises, blockId, setShowExcerciseDetails}) => {
  const collection = useMemo(() => sortBy(excercises, e => e.sort_order))

  return (
    <div className='grabbable'>
      {collection.map((excercise, index) => (
        <SortableItem
          blockId={blockId}
          collection={collection}
          excercise={excercise}
          index={index}
          key={excercise.id}
          setShowExcerciseDetails={setShowExcerciseDetails}
        />
      ))}
    </div>
  )
})

function BlockWrapper(props) {
  const [name, setName] = useState(props.block.name || '')
  const [rounds, setRounds] = useState(props.block.sets || '')
  const [favourite, setFavourite] = useState(props.block.favourite)
  const [showBlockDetails, setShowBlockDetails] = useState(props.block.name || props.block.sets)
  const [showMenuIcons, setShowMenuIcons] = useState(false)

  const handleFavourite = (bool) => {
    setFavourite(bool)
    props.updateBlock({ favourite: bool })
  }

  const onSortEnd = useCallback(({ oldIndex, newIndex, collection }) => {
    const newOrder = arrayMove(collection, oldIndex, newIndex)
    newOrder.map((excercise, index) => {
      props.updateExcercise(excercise.id, { sort_order: index })
    })
  })

  return (
    <div
      className='block-wrapper'
      onMouseEnter={() => setShowMenuIcons(true)}
      onMouseLeave={() => setShowMenuIcons(false)}
    >
      <div>
        { showBlockDetails ? (
          <TextField
            autoFocus={true}
            label='Block Name'
            onChange={(e) => {
              setName(e.target.value)
              props.updateBlock({ name: e.target.value })
            }}
            size='small'
            value={name}
            width='50'
            style={{ paddingBottom: '5px'}}
          />
        ) : (
          <div
            style={{paddingRight: '2px', display: 'inline-block', paddingBottom: '10px', paddingTop: '2px'}}
            className='hyperlink-button'
            onClick={() => setShowBlockDetails(true)}
          >
            + Block name
          </div>
        )}
        { showBlockDetails ? (
          <TextField
            label='Block Rounds'
            onChange={e => {
              setRounds(e.target.value)
              props.updateBlock({ sets: e.target.value })
            }}
            size='small'
            value={rounds}
            width='50'
            style={{ paddingBottom: '5px'}}
          />
        ) : (
          <div
            style={{paddingRight: '2px', display: 'inline-block', paddingBottom: '10px', paddingTop: '2px'}}
            className='hyperlink-button'
            onClick={() => setShowBlockDetails(true)}
          >
            + Block rounds
          </div>
        )}
        { showMenuIcons && (
          <Tooltip title='Delete block'>
            <IconButton
              onClick={props.deleteBlock}
              size={showBlockDetails ? 'medium' : 'small'}
            >
              <Delete fontSize='inherit' />
            </IconButton>
          </Tooltip>
        )}
        { showMenuIcons &&
          ( favourite ? (
            <Tooltip title="Remove block from side bar">
              <IconButton
                onClick={() => handleFavourite(false)}
                size={showBlockDetails ? 'medium' : 'small'}
              >
                <Favorite fontSize='inherit' />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Add block to side bar">
              <IconButton
                size={showBlockDetails ? 'medium' : 'small'}
                onClick={() => handleFavourite(true)}
              >
                <FavoriteBorder fontSize='inherit' />
              </IconButton>
            </Tooltip>
          ))
        }
      </div>
      <SortableList
        blockId={props.blockId}
        distance={1}
        excercises={props.excercises}
        onSortEnd={onSortEnd}
        setShowExcerciseDetails={props.setShowExcerciseDetails}
      />
      <div
        className='hyperlink-button'
        onClick={props.addExcercise}
      >
        + Add Excercise
      </div>
    </div>
  )
}

BlockWrapper.propTypes = {
  block: PropTypes.object.isRequired,
  blockId: PropTypes.number.isRequired,
  excercises: PropTypes.array.isRequired,
  workoutId: PropTypes.number.isRequired,
  setShowExcerciseDetails: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  block: Selectors.getBlockById(state, ownProps.blockId),
  excercises: Selectors.getExcercisesByBlockId(state, ownProps.blockId)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addExcercise: () => dispatch(saveNewExcercise({ movement: '', block_id: ownProps.blockId })),
  updateBlock: (payload) => dispatch(updateBlock(ownProps.blockId, payload)),
  deleteBlock: () => dispatch(removeBlock(ownProps.blockId)),
  updateExcercise: (id, payload) => dispatch(updateExcercise(id, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(BlockWrapper)
