import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { sortBy } from "lodash";
import * as Selectors from "Calendar/redux/selectors";
import {
  updateWorkout,
  removeWorkout,
} from "Calendar/redux/reducers/workoutsSlice";
import { saveNewBlock, updateBlock } from "Calendar/redux/reducers/blocksSlice";
import BlockWrapper from "./BlockForm";
import ExcerciseDetails from "./ExcerciseDetails";

const SortableItem = SortableElement(
  ({ block, workoutId, setShowExcerciseDetails }) => (
    <BlockWrapper
      blockId={block.id}
      key={block.id}
      workoutId={workoutId}
      setShowExcerciseDetails={setShowExcerciseDetails}
    />
  )
);

const SortableList = SortableContainer(
  ({ blocks, workoutId, setShowExcerciseDetails }) => {
    const collection = useMemo(() => sortBy(blocks, (b) => b.order));

    return (
      <div className="cursor-move">
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
    );
  }
);

function WorkoutForm(props) {
  const [workoutName, setWorkoutName] = useState(props.workout.name);
  const [favourite, setFavourite] = useState(props.workout.favourite);
  const [menuShown, setMenuShown] = useState(false);
  const [showExcerciseDetails, setShowExcerciseDetails] = useState(false);

  const onSortEnd = useCallback(({ oldIndex, newIndex, collection }) => {
    const newOrder = arrayMove(collection, oldIndex, newIndex);
    newOrder.map((block, index) => {
      props.updateBlock(block.id, { order: index });
    });
  });

  const handleFavourite = () => {
    setFavourite(!favourite);
    props.updateWorkout({ favourite: !favourite });
  };

  const handleChange = (e) => {
    setWorkoutName(e.target.value);
    props.updateWorkout({ name: e.target.value });
  };

  return (
    // TODO the div below item start like google
    <div className="items-start">
      <div className="p-2 mx-auto bg-white rounded-xl shadow-2xl fixed dark:bg-gray-600 dark:text-gray-200">
        <div
          onMouseEnter={() => props.view === "Session" && setMenuShown(true)}
          onMouseLeave={() => props.view === "Session" && setMenuShown(false)}
        >
          {props.view === "Session" && (
            <input
              autoFocus
              className="rounded border my-1 py-3 mx-2 px-4 text-gray-700 leading-tight focus:outline-none dark:bg-gray-400 dark:text-gray-800"
              id="session-name"
              type="text"
              placeholder="Session Name"
              value={workoutName}
              onChange={handleChange}
            />
          )}
          {(menuShown || (workoutName && props.blocks.length === 0)) && (
            <button onClick={props.deleteWorkout}>
              {/* delete */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline dark:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
          {(menuShown || (workoutName && props.blocks.length === 0)) &&
            (favourite ? (
              <button onClick={handleFavourite}>
                {/* full heart */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline dark:text-gray-200"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ) : (
              <button onClick={handleFavourite}>
                {/* hollow heart */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline dark:text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            ))}
          {props.view === "Session" && (
            <button
              className="float-right"
              onClick={() => props.setAnchorEl(null)}
            >
              {/* close */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 dark:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="mt-3" id="workout-wrapper">
          <SortableList
            blocks={props.blocks}
            distance={1}
            onSortEnd={onSortEnd}
            workoutId={props.workoutId}
            setShowExcerciseDetails={setShowExcerciseDetails}
          />
        </div>
        <div
          className="text-left cursor-pointer dark:text-gray-200"
          onClick={props.addBlock}
        >
          {props.view != "Excercise" && "+ Add Block"}
        </div>
      </div>
      {showExcerciseDetails && (
        <ExcerciseDetails
          excerciseId={showExcerciseDetails}
          setShowExcerciseDetails={setShowExcerciseDetails}
        />
      )}
    </div>
  );
}

WorkoutForm.propTypes = {
  blocks: PropTypes.array.isRequired,
  setAnchorEl: PropTypes.func.isRequired,
  workout: PropTypes.object.isRequired,
  workoutId: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  blocks: Selectors.getBlocksByWorkoutId(state, ownProps.workoutId),
  view: state.user.selected_view,
  workout: Selectors.getWorkoutById(state, ownProps.workoutId),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addBlock: () => dispatch(saveNewBlock({ workout_id: ownProps.workoutId })),
  deleteWorkout: () => dispatch(removeWorkout(ownProps.workoutId)),
  updateBlock: (id, payload) => dispatch(updateBlock(id, payload)),
  updateWorkout: (payload) =>
    dispatch(updateWorkout(ownProps.workoutId, payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutForm);
