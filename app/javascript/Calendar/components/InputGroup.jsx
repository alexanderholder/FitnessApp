import React from 'react';

export default function InputGroup(props) {

  return (
    <div>
      <label htmlFor={props.label} className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          name={props.label}
          id={props.label}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder={props.placeholder}
        />
      </div>
    </div>
  )
}
