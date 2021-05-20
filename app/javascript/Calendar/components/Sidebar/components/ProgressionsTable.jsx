import React from 'react';
import InputGroup from '../../InputGroup';

export default function ProgressionsTable(props) {
  const Rows = () => {
    const rows = [];

    for (let i = 0; i < 4; i++) {
      rows.push(
        <div className='w-16'>
          <InputGroup />
          <InputGroup />
          <InputGroup />
          <InputGroup />
        </div>
      )
    }

    return rows;
  }

  const Tables = () => {
    const tables = [];

    for (let i = 0; i < 4; i++) {
      tables.push(
        <div className='text-center inline-block m-2'>
          {`Week ${i + 1}`}
          <div className="grid grid-cols-4 gap-4">
            <div>Reps</div>
            <div>%</div>
            <div>RIR</div>
            <div>RPE</div>
            <Rows />
          </div>
        </div>
      )
    }

    return tables;
  }

  return (
    <React.Fragment>
      <InputGroup placeholder='Strength A' label='Progression Name' />
      <Tables />
    </React.Fragment>
  )
}
