import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import WindowState from "windowState";
import { saveNewWorkout } from "Calendar/redux/reducers/workoutsSlice";
import * as Selectors from "Calendar/redux/selectors";
import Card from "./Card";

function CardWrapper(props) {
  if (props.workouts.length === 0) {
    return [];
  } else if (props.view === "Excercise") {
    let cards = [];

    props.blocks.map((block) =>
      props.excercises.map((excercise) => {
        if (excercise.block_id === block.id) {
          cards.push(
            <Card
              key={excercise.id}
              setIsShown={props.setIsShown}
              excerciseId={excercise.id}
              workoutId={block.workout_id}
            />
          );
        }
      })
    );
    return cards;
  } else if (props.view === "Block") {
    return props.blocks.map((block) => (
      <Card
        key={block.id}
        setIsShown={props.setIsShown}
        blockId={block.id}
        workoutId={block.workout_id}
      />
    ));
  } else if (props.workouts.length < 6) {
    // TODO sort_by
    return props.workouts.map((workout) => (
      <Card
        key={workout.id}
        setIsShown={props.setIsShown}
        workoutId={workout.id}
      />
    ));
  } else {
    let output = [];

    props.workouts.map((workout, index) => {
      if (index < 5) {
        output.push(
          <Card
            key={workout.id}
            setIsShown={props.setIsShown}
            workoutId={workout.id}
          />
        );
      }
    });
    if (props.workouts.length > 5) {
      output.push(
        <div
          className="cursor-pointer dark:text-gray-200"
          key={`${props.day_number}-length`}
          onClick={() => props.setDayPopoverIsShown(true)}
        >
          <p className='text-center'>{`${props.workouts.length - 5} more`}</p>
        </div>
      );
    }
    return output;
  }
}

function Day(props) {
  const dayPopoverRef = React.useRef(null);
  const [isShown, setIsShown] = useState(false);
  const [isDayPopoverShown, setDayPopoverIsShown] = useState(false);
  const [dragOverIsShown, setDragOverIsShown] = useState(false);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (
        dayPopoverRef.current &&
        !dayPopoverRef.current.contains(event.target)
      ) {
        setIsShown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dayPopoverRef]);

  const handleClick = () => {
    props.addWorkout({
      day_number: props.dayNumber,
      training_template_id: props.trainingTemplateId,
    });
    setIsShown(false);
  };

  const handleDragEnter = (e) => {
    e.stopPropagation();
    WindowState.hovered_day = props.dayNumber;
    setDragOverIsShown(true);
  };

  const handleMouseEnter = () => {
    WindowState.hovered_day = props.dayNumber;
    if (
      (props.view === "Session" && props.workouts.length < 6) ||
      (props.view === "Block" && props.blocks.length < 6) ||
      (props.view === "Excercise" && props.excercises.length < 6)
    ) {
      setIsShown(true);
    }
  };

  const handleMouseLeave = () => {
    WindowState.hovered_day = null;
    setIsShown(false);
  };

  return (
    <td
      className="h-40 align-top border border-t-0 dark:bg-gray-700 dark:text-gray-200"
      key={props.dayNumber}
      onDragEnter={handleDragEnter}
      onDragLeave={() => setDragOverIsShown(false)}
      onDragOver={() => setIsShown(false)}
      onDrop={() => setDragOverIsShown(false)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isDayPopoverShown && (
        <div
          className="w-40 p-1 rounded-xl shadow-md dark:bg-gray-600 dark:text-gray-200"
          key={`${props.dayNumber}-day-popover`}
          ref={dayPopoverRef}
        >
          <p className='text-center'>{props.dayNumber}</p>
          {props.workouts.map((workout, index) => (
            <Card
              key={workout.id}
              setIsShown={setIsShown}
              workoutId={workout.id}
            />
          ))}
          <div
            className="cursor-pointer dark:text-gray-200"
            onClick={handleClick}
          >
            <p className='text-center'>{`+ New ${props.view}`}</p>
          </div>
        </div>
      )}
      <p className='text-center'>{props.dayNumber}</p>
      <CardWrapper
        blocks={props.blocks}
        excercises={props.excercises}
        key={props.dayNumber}
        setDayPopoverIsShown={setDayPopoverIsShown}
        setIsShown={setIsShown}
        view={props.view}
        workouts={props.workouts}
      />
      {dragOverIsShown && (
        <div
          className="h-5 border"
          onDrop={() => setDragOverIsShown(false)}
          onDragLeave={() => setDragOverIsShown(false)}
          onDragEnter={handleDragEnter}
        />
      )}
      {isShown && (
        <div
          className="cursor-pointer dark:text-gray-200"
          onClick={handleClick}
        >
          <p className='text-center'>{`+ New ${props.view}`}</p>
        </div>
      )}
    </td>
  );
}

Day.propTypes = {
  dayNumber: PropTypes.number.isRequired,
};

CardWrapper.propTypes = {
  workouts: PropTypes.array.isRequired,
  setIsShown: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const view = state.user.selected_view;
  const trainingTemplateId = state.user.selected_template;
  const workouts = Selectors.getWorkoutsByDayNumberFilter(
    state,
    ownProps.dayNumber
  );
  const blocks = Selectors.getBlocksByWorkoutIds(
    state,
    workouts.map((w) => w.id)
  );
  const excercises = Selectors.getExcercisesByBlockIds(
    state,
    blocks.map((b) => b.id)
  );

  return { trainingTemplateId, workouts, blocks, excercises, view };
};

const mapDispatchToProps = (dispatch) => ({
  addWorkout: (initialWorkout) => dispatch(saveNewWorkout(initialWorkout)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Day);
