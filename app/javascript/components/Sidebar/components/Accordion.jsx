import React, { useState } from 'react'
import Redux from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getFavouriteWorkouts } from 'javascript/redux/selectors'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import WorkoutCard from 'javascript/components/Calendar/components/Workout/components/WorkoutCard'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

function SimpleAccordion(props) {
  const classes = useStyles()
  const [isShown, setIsShown] = useState(false)

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          aria-controls='panel1a-content'
          expandIcon={<ExpandMoreIcon />}
          id='panel1a-header'
        >
          <Typography className={classes.heading}>Favourite Sessions</Typography>
        </AccordionSummary>
        {props.workouts.length > 0 ? (
          props.workouts.map(workout => (
            <WorkoutCard
              style={{display: 'inline'}}
              key={workout.id}
              setIsShown={setIsShown}
              templateWorkout={true}
              workoutId={workout.id}
            />
          ))
        ) : (
          <Typography>No Sessions Favourited</Typography>
        )}
      </Accordion>
      {/* <Accordion>
        <AccordionSummary
          aria-controls='panel1a-content'
          expandIcon={<ExpandMoreIcon />}
          id='panel1a-header'
        >
          <Typography className={classes.heading}>Favourite Blocks</Typography>
        </AccordionSummary>
        {props.blocks.length > 0 ? (
          props.workouts.map(workout => (
            <WorkoutCard
              style={{display: 'inline'}}
              key={workout.id}
              setIsShown={setIsShown}
              templateWorkout={true}
              workoutId={workout.id}
            />
          ))
        ) : (
          <Typography>No Blocks Favourited</Typography>
        )}
      </Accordion> */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography className={classes.heading}>Sets and reps</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            1x12/10/8
            <br/>
            1x6/8/10
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel3a-content'
          id='panel3a-header'
        >
          <Typography className={classes.heading}>Excercise Library</Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  )
}

SimpleAccordion.propTypes = {
  workouts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  workouts: getFavouriteWorkouts(state)
})

// const mapDispatchToProps = dispatch => ({
//   addWorkout: (initialWorkout) => dispatch(saveNewWorkout(initialWorkout))
// })

export default connect(mapStateToProps)(SimpleAccordion)
