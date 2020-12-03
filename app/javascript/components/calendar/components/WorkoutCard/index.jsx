import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import Form from './views/Form'

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}))

function RenderCard(props) {
  const workoutDetails = props.workoutDetails
  const [isShown, setIsShown] = useState(false)

  if ( workoutDetails && workoutDetails.name ) {
    return (
      <div>{ workoutDetails && workoutDetails.name }</div>
    )
  } else {
    return (
      <div
        className="hoverable-area"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        { isShown && (<div>+ New Workout</div>) }
      </div>
    )
  }
}

function Card(props) {
  const workoutDetails = props.workoutDetails
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <div
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <RenderCard workoutDetails={workoutDetails} />
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
          <Form workoutDetails={workoutDetails} />
        </Typography>
      </Popover>
    </div>
  )
}

export default Card
