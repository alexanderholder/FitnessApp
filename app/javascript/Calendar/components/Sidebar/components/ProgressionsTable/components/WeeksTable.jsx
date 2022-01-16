import React, { useState } from "react";
import SetsTable from "./SetsTable";
import Plus from "svg/plus";
import Minus from "svg/minus";

export default function WeekTables({
  // numberOfWeeks,
  progressionsArray,
  setProgressionsArray,
  addSet,
}) {
  const tables = [];

  progressionsArray.map((progression) => {
    const weekNumber = progression.week;

    const removeSet = () => setSets(sets - 1);

    tables.push(
      <table className="text-center inline-block m-2">
        {`Week ${weekNumber}`}
        <tr className="grid grid-cols-4 gap-4">
          <th>Reps</th>
          <th>%</th>
          <th>RIR</th>
          <th>RPE</th>
        </tr>
        <SetsTable
          weekNumber={weekNumber}
          sets={progression.sets.length}
          progressionsArray={progressionsArray}
          setProgressionsArray={setProgressionsArray}
        />
        <button
          className="focus:outline-none"
          onClick={() => addSet(weekNumber)}
        >
          <Plus />
        </button>
        <button className="focus:outline-none" onClick={removeSet}>
          <Minus />
        </button>
      </table>
    );
  });

  return tables;
}
