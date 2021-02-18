import React from 'react'
import PropTypes from 'prop-types'
import Redux from 'redux'
import { connect } from 'react-redux'
import { logoutUser } from 'javascript/redux/reducers/usersSlice'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

function Navbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <nav
        aria-controls='user-menu'
        aria-haspopup='true'
        onClick={handleClick}
        style={{ marginRight: '20px' }}
      >
        <Avatar />
      </nav>
      <Menu
        id='user-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Dark Mode</MenuItem>
        <MenuItem onClick={props.handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

const mapStateToProps = (state) => ({
  darkTheme: state.dark_theme,
})

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
