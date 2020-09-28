import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

function MenuItems(props) {
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <MenuItem onClick={handleClose}>thing</MenuItem> // TODO return submenu items
  )
}

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = () => {
    setAnchorEl(props.anchorEl)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {props.option}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>thing</MenuItem>
      </Menu>
    </div>
  )
}
