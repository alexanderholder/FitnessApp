import React from 'react';

export default function ButtonGroup(props) {

  return (
    <div className={`p-1 bg-white rounded-xl shadow-md items-center border border-solid border-black divide-x group ${props.className}`}>
      {props.inputs.map((input) => (
        <button
          className='p-1 px-2 disabled:text-opacity-50'
          key={input}
          disabled={input === props.selected}
          onClick={() => props.setSelection(input)}
        >{input}</button>
      ))}
    </div>
  );
}
