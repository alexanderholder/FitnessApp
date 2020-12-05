import React, { useState } from 'react'
import './Menu.css'
import MoreVertIcon from '@material-ui/icons/MoreVert'

export default function Menu(props) {
  const [menuOpen, setMenuOpen] = useState(false)

  var isForShown = props.isForShown
  var isWeightShown = props.isWeightShown

  return (
    <table>
      <td>
        <MoreVertIcon onClick={() => { setMenuOpen(!menuOpen) }}/>
      </td>
      <td>{menuOpen && <div className="Menu">
        <div onClick={() => { setMenuOpen(!menuOpen); props.setWeightIsShown(!isWeightShown) }}>
          Weight
        </div>
        <div onClick={() => { setMenuOpen(!menuOpen); props.setForIsShown(!isForShown) }}>
          For
        </div>
      </div>}</td>
    </table>
  )
}
