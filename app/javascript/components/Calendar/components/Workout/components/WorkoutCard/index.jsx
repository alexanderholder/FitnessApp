// @flow
import React, { useState }  from "react"
import Redux                from "redux"
import PropTypes            from "prop-types"
import { connect }          from "react-redux"

import * as Selectors       from "../../../../../../redux/selectors"

import { makeStyles }       from "@material-ui/core/styles"
import Popover              from "@material-ui/core/Popover"
import Typography           from "@material-ui/core/Typography"

import WorkoutPopover       from "../../views/WorkoutFormWrapper"

const WorkoutCard = (props) => {
  const useStyles = makeStyles((theme) => ({ typography: { padding: theme.spacing(2), }, }))
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = (event) => { setAnchorEl(event.currentTarget) }
  const handleClose = () => { setAnchorEl(null) }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div className="workout-element">
      <div
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
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
          <WorkoutPopover workout_id={props.workout.id} />
        </Typography>
      </Popover>
    </div>
  )
}

WorkoutCard.propTypes = {
  workout_id: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const workout = Selectors.getWorkoutById(state, ownProps.workout_id)
  return { workout }
}

export default connect(mapStateToProps)(WorkoutCard)
