import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import WindowState from "windowState";
import * as Selectors from "Calendar/redux/selectors";
import {
  copyWorkout,
  updateWorkout,
} from "Calendar/redux/reducers/workoutsSlice";
import SessionForm from "./forms/SessionForm";

function Card(props) {
  const [anchorEl, setAnchorEl] = useState(props.newCard);
  const [dragOverIsShown, setDragOverIsShown] = useState(false);

  const handleMouseEnter = () => {
    // TODO: this will stop copy paste from tempaltes :(
    if (!props.templateWorkout) {
      WindowState.hovered_card_id = props.id;
    }
  };

  const handleMouseLeave = () => {
    // TODO: this will stop copy paste from tempaltes :(
    if (!props.templateWorkout) {
      WindowState.hovered_card_id = null;
    }
  };

  const handleClick = (event) => {
    if (!props.templateWorkout) {
      setAnchorEl(event.currentTarget);
      props.setIsShown(false);
    }
  };

  const handleClose = () => {
    // TODO
    setAnchorEl(null);
    WindowState.new_card_id = null;
  };

  const handleDragEnd = () => {
    if (props.templateWorkout) {
      props.copyWorkout();
    } else {
      props.updateWorkout({ day_number: WindowState.hovered_day });
    }
  };

  const handleDragEnter = (e) => {
    e.stopPropagation();
    e.preventDefault();
    WindowState.hovered_card_id = props.id;
  };

  return (
    <React.Fragment>
      <div
        className="h-5 w-full bg-gray-300 rounded text-white cursor-pointer border-b border-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 transition duration-300 ease-in-out"
        draggable
        id={`card-${props.view}-${props.id}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onDragEnd={handleDragEnd}
        onDragEnter={handleDragEnter}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="text-center">
          {`${props.cardName} ${
            props.setsAndReps ? ` ${props.setsAndReps}` : ""
          }`}
        </p>
      </div>

      {Boolean(anchorEl) && (
        <div className="absolute inset-0">
          <SessionForm
            workoutId={props.workoutId}
            setAnchorEl={setAnchorEl}
            anchorEl={anchorEl}
          />
        </div>
      )}
    </React.Fragment>
  );
}

Card.propTypes = {
  templateWorkout: PropTypes.bool,
  setIsShown: PropTypes.func.isRequired,
  workoutId: PropTypes.number,
};

Card.defaultProps = {
  templateWorkout: false,
};

const mapStateToProps = (state, ownProps) => {
  const newCard = ownProps.workoutId == WindowState.new_card_id ? true : false;
  const view = state.user.selected_view;
  let cardName;
  let id;
  let setsAndReps;

  if (view === "Excercise") {
    let excercise = Selectors.getExcerciseById(state, ownProps.excerciseId);
    cardName = excercise?.movement;
    setsAndReps = excercise?.measurement_value;
    id = ownProps.excerciseId;
  } else if (view === "Block") {
    cardName = Selectors.getBlockById(state, ownProps.blockId)?.name;
    id = ownProps.blockId;
  } else {
    cardName = Selectors.getWorkoutById(state, ownProps.workoutId).name;
    id = ownProps.workoutId;
  }

  return { cardName, newCard, view, id, setsAndReps };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  copyWorkout: () =>
    dispatch(copyWorkout(ownProps.workoutId, WindowState.hovered_day)),
  updateWorkout: (payload) =>
    dispatch(updateWorkout(ownProps.workoutId, payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
