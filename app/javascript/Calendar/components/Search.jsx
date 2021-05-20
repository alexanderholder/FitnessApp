import React from 'react';

export default function Search(props) {

  return (
    <div className="p-2">
      <div className={`bg-white flex items-center rounded-xl shadow-md ${props.className}`}>
        <input
          className="rounded-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
          id="search"
          type="text"
          placeholder="Search"
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
        />
      </div>
    </div>
  )
}
