import React from "react"

export default function DropSearch(props) {

  return(
    <div className="py-2 px-6">
      <input
        className={props.className}
        id={props.id}
        list="options"
        onBlur={(event) => props.onBlur(event.target.value)}
        onChange={(event) => props.onChange(event.target.value)}
        onClick={(event) => props.onClick(event.target.value)}
        onFocus={(event) => props.onFocus(event.target.value)}
        type="search"
        value={props.value}
      />
      <datalist id="options">
        {props.datalist.map((option) =>
          <option value={option} key={option} />
        )}
      </datalist>
    </div>
  )
}
