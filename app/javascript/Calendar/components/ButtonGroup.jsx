import React from 'react';

export default function ButtonGroup(props) {

  return (
    <div className='py-4 px-6'>
      <div className={`p-1 bg-white rounded-xl flex items-center divide-x group ${props.className}`}>
        {props.inputs.map((input) => (
          <div className='shadow-inner'>
            <button
              className='p-1 px-2 focus:outline-none'
              key={input}
              onClick={() => props.setSelection(input)}
            >{input}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
