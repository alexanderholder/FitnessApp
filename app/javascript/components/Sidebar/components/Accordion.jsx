import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import WindowState from 'javascript/windowState'
import { getFavouriteWorkouts, getFavouriteBlocks } from 'javascript/redux/selectors'
import { copyBlock } from 'javascript/redux/reducers/blocksSlice'
import { saveNewProgression } from 'javascript/redux/reducers/sessionProgressionsSlice'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import WorkoutCard from 'javascript/components/Calendar/components/WorkoutCard'
import Modal from './Modal'
import TextField from '@material-ui/core/TextField'

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
  const [name, setName] = useState("")
  const [progressions, setProgressions] = useState("")

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
          <Typography style={{textAlign: 'center'}}>No Sessions Favourited</Typography>
        )}
      </Accordion>
      <Accordion>
        <AccordionSummary
          aria-controls='panel1a-content'
          expandIcon={<ExpandMoreIcon />}
          id='panel1a-header'
        >
          <Typography className={classes.heading}>Favourite Blocks</Typography>
        </AccordionSummary>
        <div style={{textAlign: 'center'}}>
          {props.blocks.length > 0 ? (
            props.blocks.map(block => (
              <Typography
                key={block.id}
                draggable
                onDragEnd={() => props.copyBlock(block.id)}
              >
                {block.name || 'unnamed block'}
              </Typography>
            ))
          ) : (
            <Typography>No Blocks Favourited</Typography>
          )}
        </div>
      </Accordion>
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel4a-header'
        >
          <Typography className={classes.heading}>Progression</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography> TODO this is a error as T is a <P> */}
            {props.progressions ? props.progressions.map(progression =>
              <div key={progression.name}>{progression.name}<br/></div>) : (<></>)
            }
            <Modal
              buttonName="Create Progression"
              modalName="Create Progression"
              textBody="Add you're sets and reps progressions to autobuild you're session progressions."
              textBodyTwo={
                <div style={{ textAlign: 'center' }} >
                  <TextField
                    label="Progression Name"
                    style={{ boder: 5, paddingRight: 5, }}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <TextField
                    label="Progression sets and reps"
                    style={{ border: 5, }}
                    onChange={(event) => setProgressions(event.target.value)}
                  />
                </div>
              }
              saveName="Create"
              submitFunction={() => props.saveNewProgression({name: name, progressions: progressions})}
            />
          {/* </Typography> */}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

SimpleAccordion.propTypes = {
  workouts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  workouts: getFavouriteWorkouts(state),
  blocks: getFavouriteBlocks(state),
  progressions: state.sessionProgressions,
})

const mapDispatchToProps = dispatch => ({
  copyBlock: (id) => dispatch(copyBlock(id, WindowState.hovered_card_id)),
  saveNewProgression: (payload) => dispatch(saveNewProgression(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SimpleAccordion)
