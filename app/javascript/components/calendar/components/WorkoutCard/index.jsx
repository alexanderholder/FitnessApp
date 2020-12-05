import React, { useState }  from 'react'
import Redux                from "redux"
import PropTypes            from 'prop-types'
import { connect }          from "react-redux"
import { makeStyles }       from '@material-ui/core/styles'
import Popover              from '@material-ui/core/Popover'
import Typography           from '@material-ui/core/Typography'
import Form                 from './views/Form'

const WorkoutCard = (props) => {
  const useStyles = makeStyles((theme) => ({ typography: { padding: theme.spacing(2), }, }))
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = (event) => { setAnchorEl(event.currentTarget) }
  const handleClose = () => { setAnchorEl(null) }
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
        { props.workout && props.workout.name }
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
          <Form workout={props.workout} />
        </Typography>
      </Popover>
    </div>
  )
}

// Card.propTypes = {
//   // workouts: PropTypes.arrayOf(Workout).isRequired TODO fix this later
//   workouts: PropTypes.array.isRequired
// }

// const mapStateToProps = (state, ownProps) => {
//   const workouts = getWorkoutsByDayNumberFilter(state, ownProps.dayNumber)
//   return { workouts }
// }

export default connect()(WorkoutCard)
