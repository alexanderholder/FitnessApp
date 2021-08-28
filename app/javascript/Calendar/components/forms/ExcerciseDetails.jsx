import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateExcercise,
  removeExcercise,
} from "Calendar/redux/reducers/excercisesSlice";
import * as Selectors from "Calendar/redux/selectors";
import ButtonGroup from "components/ButtonGroup";

function ExcerciseDetails(props) {
  const [measurement, setMeasurement] = useState(
    props.excercise.measurement_value
  );
  const [weight, setWeight] = useState(props.excercise.weight_value);
  const [weightMetric, setWeightMetric] = React.useState("KG");

  return (
    <React.Fragment
      className="p-1 max-w-sm mx-auto bg-white rounded-xl shadow-md items-center space-x-4 fixed inline-block"
      key={`excercise-popover-${props.excerciseId}`}
    >
      <div>
        {props.excercise.movement}
        <button
          onClick={() => {
            props.setShowExcerciseDetails(null);
            props.removeExcercise();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
        <button
          className="float-right"
          onClick={() => props.setShowExcerciseDetails(null)}
        >
          {/* close */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
      </div>
      <input
        key="weight-text-box"
        label="Weight"
        margin="dense"
        type="text"
        onChange={(e) => {
          setWeight(e.target.value);
          props.updateExcercise(props.excerciseId, {
            weight_value: e.target.value,
          });
        }}
        value={weight}
      />
      <ButtonGroup
        className="mr-4 my-2 dark:bg-gray-200"
        inputs={["KG", "LB"]}
        selected={props.weightMetric}
        setSelection={props.setWeightMetric}
      />
      <input
        key="measurement-text-box"
        label="Sets & Reps"
        margin="dense"
        type="text"
        onChange={(e) => {
          setMeasurement(e.target.value);
          props.updateExcercise(props.excerciseId, {
            measurement_value: e.target.value,
          });
        }}
        value={measurement}
      />
    </React.Fragment>
  );
}

ExcerciseDetails.propTypes = {
  excerciseId: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  excercise: Selectors.getExcerciseById(state, ownProps.excerciseId),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeExcercise: () => dispatch(removeExcercise(ownProps.excerciseId)),
  updateExcercise: (id, payload) => dispatch(updateExcercise(id, payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExcerciseDetails);
