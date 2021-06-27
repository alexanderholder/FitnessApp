import React, { useState, useMemo, useCallback } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import arrayMove from "array-move"
import { sortBy } from "lodash"
import * as Selectors from "Calendar/redux/selectors"
import { saveNewExcercise, updateExcercise } from "Calendar/redux/reducers/excercisesSlice"
import { updateBlock, removeBlock } from "Calendar/redux/reducers/blocksSlice"
import ExcerciseForm from "./ExcerciseForm"

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
    <div className="cursor-move">
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

function BlockForm(props) {
  const [name, setName] = useState(props.block.name || "")
  const [rounds, setRounds] = useState(props.block.sets || "")
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
      className={props.view != "Excercise" && "m-1 px-3 border rounded-lg cursor-move"}
      onMouseEnter={() => props.view != "Excercise" && setShowMenuIcons(true)}
      onMouseLeave={() => props.view != "Excercise" && setShowMenuIcons(false)}
    >
      <div className="m-1 px-3 flex">
        { props.view != "Excercise" && (showBlockDetails ? (
          <React.Fragment>
            <input
              autoFocus
              className="rounded py-4 px-6 text-gray-700 leading-tight focus:outline-none dark:bg-gray-400 dark:text-gray-800"
              // label="Block Name"
              onChange={(e) => {
                setName(e.target.value)
                props.updateBlock({ name: e.target.value })
              }}
              value={name}
            />
            <input
              // label="Block Rounds"
              className="rounded py-4 px-6 text-gray-700 leading-tight focus:outline-none dark:bg-gray-400 dark:text-gray-800"
              onChange={e => {
                setRounds(e.target.value)
                props.updateBlock({ sets: e.target.value })
              }}
              value={rounds}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div
              style={{paddingRight: "2px", display: "inline-block", paddingBottom: "10px", paddingTop: "2px"}}
              className="cursor-pointer"
              onClick={() => setShowBlockDetails(true)}
            >
              + Block name
            </div>
            <div
              style={{paddingRight: "2px", display: "inline-block", paddingBottom: "10px", paddingTop: "2px"}}
              className="cursor-pointer"
              onClick={() => setShowBlockDetails(true)}
            >
              + Block rounds
            </div>
          </React.Fragment>
        ))}
        { showMenuIcons && (
          <button
            onClick={props.deleteBlock}
            size={showBlockDetails ? "medium" : "small"} // TODO
          >
            {/* Trash */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
        { showMenuIcons &&
          ( favourite ? (
            <button
              onClick={() => handleFavourite(false)}
              size={showBlockDetails ? "medium" : "small"}
            >
              {/* Full Heart */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 dark:text-gray-200" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
          ) : (
            <button
              size={showBlockDetails ? "medium" : "small"}
              onClick={() => handleFavourite(true)}
            >
              {/* Empty Heart */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
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
        className="cursor-pointer dark:text-gray-200"
        onClick={props.addExcercise}
      >
        + Add Excercise
      </div>
    </div>
  )
}

BlockForm.propTypes = {
  block: PropTypes.object.isRequired,
  blockId: PropTypes.number.isRequired,
  excercises: PropTypes.array.isRequired,
  setShowExcerciseDetails: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  block: Selectors.getBlockById(state, ownProps.blockId),
  excercises: Selectors.getExcercisesByBlockId(state, ownProps.blockId),
  view: state.user.selected_view,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addExcercise: () => dispatch(saveNewExcercise({ movement: "", block_id: ownProps.blockId })),
  deleteBlock: () => dispatch(removeBlock(ownProps.blockId)),
  updateBlock: (payload) => dispatch(updateBlock(ownProps.blockId, payload)),
  updateExcercise: (id, payload) => dispatch(updateExcercise(id, payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BlockForm)
