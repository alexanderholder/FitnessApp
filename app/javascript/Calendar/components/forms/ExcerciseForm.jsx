import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as Selectors from "Calendar/redux/selectors";
import * as Actions from "Calendar/redux/reducers/excercisesSlice";
import DropSearch from "components/DropSearch";

function ExcerciseForm(props) {
  const [name, setName] = useState(props.excercise.movement || "");
  const [setsReps, setSetsReps] = useState(
    props.excercise.measurement_value || ""
  );
  const updateName = () => props.updateExcercise({ movement: name });
  const updateSetsReps = () =>
    props.updateExcercise({ measurement_value: setsReps });

  return (
    <div className="flex pt-1.5">
      <button className="cursor-move">
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
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </button>
      <DropSearch
        className="bg-white flex items-center border rounded-xl shadow-md w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none dark:bg-gray-400"
        datalist={props.excerciseList}
        id="excercise-search"
        onChange={(e) => setName(e)}
        onClick={() => setName("")} // TODO: I think there is a better way...
        onFocus={() => setName("")}
        onBlur={() => updateName(name)}
        value={name}
      />
      <DropSearch
        className="bg-white flex items-center border rounded-xl shadow-md w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none dark:bg-gray-400"
        datalist={props.setsRepsSchemeList}
        id="sets-reps-search"
        onChange={(e) => setSetsReps(e)}
        onClick={() => setSetsReps("")} // TODO: I think there is a better way...
        onFocus={() => setSetsReps("")}
        onBlur={() => updateSetsReps(setsReps)}
        value={setsReps}
      />
      <button
        onClick={() => {
          props.setShowExcerciseDetails(null); // TODO LMAO
          props.setShowExcerciseDetails(props.excerciseId);
        }}
      >
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
}

ExcerciseForm.propTypes = {
  excerciseId: PropTypes.number.isRequired,
  excercise: PropTypes.object.isRequired,
  setShowExcerciseDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  excercise: Selectors.getExcerciseById(state, ownProps.excerciseId),
  setsRepsSchemeList: state.setsRepsSchemeList,
  excerciseList: state.excerciseList,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeExcercise: () =>
    dispatch(Actions.removeExcercise(ownProps.excerciseId)),
  updateExcercise: (payload) =>
    dispatch(Actions.updateExcercise(ownProps.excerciseId, payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExcerciseForm);
