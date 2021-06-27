import React from "react";

export default function ProgressionsTable(props) {
  function Rows() {
    const rows = [];

    for (let i = 0; i < 4; i++) {
      rows.push(
        <tr className="w-16">
          <td><input className="border" /></td>
          <td><input className="border" /></td>
          <td><input className="border" /></td>
          <td><input className="border" /></td>
        </tr>
      )
    }

    return rows;
  }

  function Tables() {
    const tables = [];

    for (let i = 0; i < 4; i++) {
      tables.push(
        <table className="text-center inline-block m-2">
          {`Week ${i + 1}`}
          <tr className="grid grid-cols-4 gap-4">
            <th>Reps</th>
            <th>%</th>
            <th>RIR</th>
            <th>RPE</th>
          </tr>
          <Rows />
        </table>
      )
    }

    return tables;
  }

  return (
    <React.Fragment>
      <input placeholder="Strength A" label="Progression Name" className="border" /><br/>
      <Tables />
    </React.Fragment>
  )
}
