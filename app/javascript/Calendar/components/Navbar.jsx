import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../redux/reducers/usersSlice'
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
    <>
      {/* className='cursor-pointer py-4 px-6' */}
      <button className="flex -space-x-2 overflow-hidden" onClick={handleClick}>
        <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
      </button>
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
    </>
  )
}

const mapStateToProps = (state) => ({
  darkTheme: state.dark_theme,
})

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
