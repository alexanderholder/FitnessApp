import React from 'react'

export default function DropSearch(props) {

  return(
    <div className='py-2 px-6'>
      <input
        className={props.className}
        id={props.id}
        list='options'
        onChange={(event) => props.onChange(event.target.value)}
        type='search'
        value={props.value}
      />
      <datalist id='options'>
        {props.datalist.map((option) =>
          <option value={option} key={option} />
        )}
      </datalist>
    </div>
  )
}
