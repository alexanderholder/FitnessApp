// @flow
import React, { useState, useMemo, useCallback } from 'react'
import Redux from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import arrayMove from 'array-move'
import { sortBy } from "lodash"
import * as Selectors from 'javascript/redux/selectors'
import { saveNewExcercise, updateExcercise } from 'javascript/redux/reducers/excercisesSlice'
import { updateBlock, removeBlock } from 'javascript/redux/reducers/blocksSlice'
import ExcerciseForm from '../../components/ExcerciseForm'
import { TextField, IconButton, Tooltip } from '@material-ui/core'
import { Delete, MoreVert, Favorite, FavoriteBorder } from '@material-ui/icons'

const SortableItem = SortableElement(({excercise, blockId}) => (
  <ExcerciseForm
    blockId={blockId}
    excerciseId={excercise.id}
    key={excercise.id}
  />
))

const SortableList = SortableContainer(({excercises, blockId}) => {
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
        />
      ))}
    </div>
  )
})

const BlockWrapper = props => {
  const [name, setName] = useState(props.block.name || '')
  const [rounds, setRounds] = useState(props.block.sets || '')
  const [showName, setShowName] = useState(props.block.name || props.block.sets)
  const [showRounds, setShowRounds] = useState(props.block.name || props.block.sets)
  const [showMenuIcons, setShowMenuIcons] = useState(false)

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
      <div style={{ paddingBottom: '10px'}}>
        { showName ? (
          <TextField
            autoFocus={true}
            label='Block Name'
            onBlur={() => props.updateBlock({ name: name })}
            onChange={e => setName(e.target.value)}
            size='small'
            value={name}
            width='50'
          />
        ) : (
          <div
            style={{paddingRight: '2px', display: 'inline-block'}}
            className='hyperlink-button'
            onClick={() => setShowName(true)}
          >
            + Block name
          </div>
        )}
        { showRounds ? (
          <TextField
            label='Block Rounds'
            onBlur={() => props.updateBlock({ sets: rounds })}
            onChange={e => setRounds(e.target.value)}
            size='small'
            value={rounds}
            width='50'
          />
        ) : (
          <div
            style={{paddingLeft: '2px', display: 'inline-block'}}
            className='hyperlink-button'
            onClick={() => setShowRounds(true)}
          >
            + Block rounds
          </div>
        )}
        { showMenuIcons && (
          <Tooltip title='Delete block'>
            <IconButton
              onClick={props.deleteBlock}
              size='small'
              // style={{float: 'right'}}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        )}
        { showMenuIcons && ( false ? ( // TODO
          <Tooltip title="Remove block from side bar">
            <IconButton>
            {/* onClick={handleFavourite}> */}
              <Favorite />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add block to side bar">
            <IconButton>
            {/* onClick={handleFavourite}> */}
              <FavoriteBorder />
            </IconButton>
          </Tooltip>
        ))}
      </div>
      <SortableList
        blockId={props.blockId}
        distance={1}
        excercises={props.excercises}
        onSortEnd={onSortEnd}
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
