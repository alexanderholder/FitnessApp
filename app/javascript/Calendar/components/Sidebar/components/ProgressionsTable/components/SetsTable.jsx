import React, { useState } from "react";

export default function WeekTable({
  weekNumber,
  sets,
  progressionsArray,
  setProgressionsArray,
}) {
  const table = [];

  for (let i = 0; i < sets; i++) {
    const set = i + 1;

    const progression = progressionsArray.find(
      (p) => p.week == weekNumber && p.set == set
    );

    const [reps, setReps] = useState(progression?.reps || undefined);
    const [percent, setPercent] = useState(progression?.percent || undefined);
    const [rir, setRir] = useState(progression?.rir || undefined);
    const [rpe, setRpe] = useState(progression?.rpe || undefined);

    function updateProgressions(value, type, week, set) {
      let progressionToUpdate = progressionsArray.find(
        (p) => p.week == week && p.set == set
      );

      progressionToUpdate ||= {
        week: week,
        set: set,
        reps: null,
        percent: null,
        rir: null,
        rpe: null,
      };

      let otherProgressions = progressionsArray.filter(
        (p) => p.week !== week || p.set !== set
      );

      switch (type) {
        case "reps": {
          setReps(value);
          progressionToUpdate.reps = value;
          break;
        }
        case "percent": {
          setPercent(value);
          progressionToUpdate.percent = value;
          break;
        }
        case "rir": {
          setRir(value);
          progressionToUpdate.rir = value;
          break;
        }
        case "rpe": {
          setRpe(value);
          progressionToUpdate.rpe = value;
          break;
        }
      }

      setProgressionsArray([...otherProgressions, progressionToUpdate]);
    }

    const handleUpdate = (e) =>
      updateProgressions(e.target.value, e.target.name, weekNumber, set);

    table.push(
      <tr className="w-16">
        <td>
          <input
            className="border w-12"
            name="reps"
            onChange={handleUpdate}
            value={reps}
          />
        </td>
        <td>
          <input
            className="border w-12"
            name="percent"
            onChange={handleUpdate}
            value={percent}
          />
        </td>
        <td>
          <input
            className="border w-12"
            name="rir"
            onChange={handleUpdate}
            value={rir}
          />
        </td>
        <td>
          <input
            className="border w-12"
            name="rpe"
            onChange={handleUpdate}
            value={rpe}
          />
        </td>
      </tr>
    );
  }

  return table;
}
