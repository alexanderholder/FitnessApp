import React, { useState } from "react";
import { connect } from "react-redux";
import { saveNewProgression } from "Calendar/redux/reducers/sessionProgressionsSlice";
import WeekTables from "./components/WeeksTable";
import FullPageModal from "components/FullPageModal";
import Plus from "svg/plus";
import Minus from "svg/minus";
import INITIAL_STATE from "./components/InitialState";

function ProgressionsTable({
  openProgressions,
  setOpenProgressions,
  saveNewProgression,
}) {
  const [progressionName, setProgressionName] = useState("");
  const [progressionsArray, setProgressionsArray] = useState(INITIAL_STATE);

  const addWeek = () =>
    setProgressionsArray([
      ...progressionsArray,
      { week: progressionsArray.length + 1, sets: [] },
    ]);

  function addSet(weekNumber) {
    const currentProgressionSets = progressionsArray.find(
      (p) => p.week == weekNumber
    )["sets"];

    setProgressionsArray([
      ...progressionsArray.filter((p) => p.week !== weekNumber),
      {
        week: weekNumber,
        sets: [
          ...currentProgressionSets,
          {
            set: currentProgressionSets.length + 1,
            reps: null,
            percent: null,
            rir: null,
            rpe: null,
          },
        ],
      },
    ]);

    console.log(progressionsArray);
  }

  const removeWeek = () => setNumberOfWeeks(numberOfWeeks - 1);

  return (
    <FullPageModal
      open={openProgressions}
      setOpen={setOpenProgressions}
      title="Create Progression"
      body={
        <React.Fragment>
          <input
            placeholder="Strength A"
            label="Progression Name"
            className="border"
            onChange={(event) => setProgressionName(event.target.value)}
          />
          <br />
          <div className="flex items-center">
            <WeekTables
              // numberOfWeeks={numberOfWeeks}
              progressionsArray={progressionsArray}
              setProgressionsArray={setProgressionsArray}
              addSet={addSet}
            />
            <button className="focus:outline-none" onClick={addWeek}>
              <Plus />
            </button>
            <button className="focus:outline-none" onClick={removeWeek}>
              <Minus />
            </button>
          </div>
        </React.Fragment>
      }
      submitText="Create Progression"
      submitFunction={() =>
        saveNewProgression(progressionName, progressionsArray)
      }
    />
  );
}

const mapDispatchToProps = (dispatch) => ({
  saveNewProgression: (name, progressions) =>
    // dispatch(saveNewProgression(name, progressions)),
    console.log(progressions),
});

export default connect(null, mapDispatchToProps)(ProgressionsTable);
