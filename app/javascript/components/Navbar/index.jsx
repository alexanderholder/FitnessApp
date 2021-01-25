import React from "react";
import Redux from "redux"
import LetterAvatar from "./components/LetterAvatar";

import { connect, useDispatch }  from 'react-redux'

const Navbar= props => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch({ type: 'theme/themeChanged' })
  }

  return(
    <nav>
      <LetterAvatar onClick={handleClick} />
    </nav>
  )
}

const mapStateToProps = (state) => ({
  darkTheme: state.dark_theme
})

export default connect(mapStateToProps)(Navbar)
