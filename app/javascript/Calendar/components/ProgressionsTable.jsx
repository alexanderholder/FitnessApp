import React, { useState } from "react";
import { connect } from "react-redux";
import Plus from "./svg/plus";
import Minus from "./svg/minus";

function ProgressionsTable(props) {
  const [state, setState] = useState([
    { week: 1, set: 1, reps: 1, percent: 1, rir: 1, rpe: 1 },
  ]);

  function Table(props) {
    const table = [];
    const week = props.week;
    const sets = props.sets;

    for (let i = 0; i < sets; i++) {
      const set = i + 1;
      const [reps, setReps] = useState("");
      const [percent, setPercent] = useState("");
      const [rir, setRir] = useState("");
      const [rpe, setRpe] = useState("");

      const handleUpdateSet = (event) => {
        // console.log(event.target.value);
        setReps(event.target.value);
        setPercent(event.target.value);
        setRir(event.target.value);
        setRpe(event.target.value);

        setState(
          state.map((progression) => {
            if (progression.week !== week && progression.set !== set) {
              return progression;
            }

            return { week, set, reps, percent, rir, rpe };
          })
        );
        console.log(state);
      };

      // set added return [...state, action.payload];

      table.push(
        <tr className="w-16">
          <td>
            <input className="border w-12" onChange={handleUpdateSet} />
          </td>
          <td>
            <input className="border w-12" onChange={handleUpdateSet} />
          </td>
          <td>
            <input className="border w-12" onChange={handleUpdateSet} />
          </td>
          <td>
            <input className="border w-12" onChange={handleUpdateSet} />
          </td>
        </tr>
      );
    }

    return table;
  }

  function WeekTables() {
    const tables = [];

    // function addSet() {
    //   setSets(sets + 1)
    // }

    for (let i = 0; i < props.numberOfWeeks; i++) {
      const week = i + 1;
      const [sets, setSets] = useState(4);

      tables.push(
        <table className="text-center inline-block m-2">
          {`Week ${i + 1}`}
          <tr className="grid grid-cols-4 gap-4">
            <th>Reps</th>
            <th>%</th>
            <th>RIR</th>
            <th>RPE</th>
          </tr>
          <Table week={week} sets={sets} />
          <button
            className="focus:outline-none"
            onClick={() => setSets(sets + 1)}
          >
            <Plus />
          </button>
          <button
            className="focus:outline-none"
            onClick={() => setSets(sets - 1)}
          >
            <Minus />
          </button>
        </table>
      );
    }

    return tables;
  }

  return (
    <React.Fragment>
      <input
        placeholder="Strength A"
        label="Progression Name"
        className="border"
        onChange={(event) => props.setNewProgressionName(event.target.value)}
      />
      <br />
      <div className="flex items-center">
        <WeekTables />
        <button
          className="focus:outline-none"
          onClick={() => props.setNumberOfWeeks(props.numberOfWeeks + 1)}
        >
          <Plus />
        </button>
        <button
          className="focus:outline-none"
          onClick={() => props.setNumberOfWeeks(props.numberOfWeeks - 1)}
        >
          <Minus />
        </button>
      </div>
      <button onClick={() => console.log(state)}>click me</button>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  progressions: state.sessionProgressions,
});

const mapDispatchToProps = (dispatch) => ({
  copyBlock: (id) => dispatch(copyBlock(id, WindowState.hovered_card_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgressionsTable);
