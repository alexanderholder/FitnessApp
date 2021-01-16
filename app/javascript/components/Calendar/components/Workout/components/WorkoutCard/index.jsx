// @flow
import React, { useState } from 'react'
import Redux from "redux"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import * as Selectors from "javascript/redux/selectors"
import { makeStyles } from "@material-ui/core/styles"
import Popover from "@material-ui/core/Popover"
import Typography from "@material-ui/core/Typography"
import WorkoutFormWrapper from "../../views/WorkoutFormWrapper"
import WindowState from 'javascript/windowState'

const WorkoutCard = (props) => {
  const useStyles = makeStyles((theme) => ({ typography: { padding: theme.spacing(2), }, }))
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(props.new_card)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleClick = (event) => { setAnchorEl(event.currentTarget) }
  const handleClose = () => {
    setAnchorEl(null)
    WindowState.new_card_id = null
  }

  const setCardIsHovered = () => WindowState.hovered_card_id = props.workout_id
  const unsetCardIsHovered = () => WindowState.hovered_card_id = null

  return (
    <React.Fragment>
      <div
        className="workout-element"
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
        onMouseEnter={setCardIsHovered}
        onMouseLeave={unsetCardIsHovered}
      >
        { props.workout.name }
      </div>
      <Popover
        className="workout-form"
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography
          className={classes.typography}
          component={'span'}
          variant={'body2'}
        >
          <WorkoutFormWrapper workout_id={props.workout.id} />
        </Typography>
      </Popover>
    </React.Fragment>
  )
}

WorkoutCard.propTypes = {
  workout_id: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const workout = Selectors.getWorkoutById(state, ownProps.workout_id)
  const new_card = ownProps.workout_id == WindowState.new_card_id ? true : false
  return { workout, new_card }
}

export default connect(mapStateToProps)(WorkoutCard)
