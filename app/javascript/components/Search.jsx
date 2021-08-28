import React from "react";

export default function Search(props) {
  return (
    <div className="p-2">
      <div
        className={`bg-white flex items-center border rounded-xl shadow-md dark:bg-gray-400 ${props.className}`}
      >
        <input
          className="rounded-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none dark:bg-gray-400 dark:text-gray-800"
          id="search-bar"
          type="search"
          placeholder="Search"
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
        />
      </div>
    </div>
  );
}
