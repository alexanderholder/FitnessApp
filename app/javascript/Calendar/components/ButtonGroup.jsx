import React from 'react';

export default function ButtonGroup(props) {

  return (
    <div className='py-2 px-6'>
      <div className={`p-1 bg-white rounded-xl shadow-md items-center flex border items-center divide-x group ${props.className}`}>
        {props.inputs.map((input) => (
          <button
            className={`p-1 px-2 focus:outline-none ${props.selected == input ? 'bg-gray-100' : ''}`}
            key={input}
            onClick={() => props.setSelection(input)}
          >{input}</button>
        ))}
      </div>
    </div>
  );
}
